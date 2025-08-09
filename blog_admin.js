import { supabase } from './supabase.js';

const postTitleInput = document.getElementById('postTitle');
const mainImageInput = document.getElementById('mainImageInput');
const editor = document.getElementById('editor');
const saveBtn = document.getElementById('saveBtn');
const postsContainer = document.getElementById('postsContainer');
const noPosts = document.getElementById('noPosts');

let posts = [];
let editingPostId = null; // ID المقال الجاري تعديله

// رفع الصورة للسيرفر
async function uploadImage(file) {
  if (!file) return null;
  const fileName = `${Date.now()}-${file.name}`;
  const storage = supabase.storage.from('blog-images');
  const { error: uploadError } = await storage.upload(fileName, file);
  if (uploadError) {
    console.error("❌ خطأ في رفع الصورة:", uploadError);
    return null;
  }
  const { data: publicUrlData } = storage.getPublicUrl(fileName);
  return publicUrlData.publicUrl;
}

// حفظ أو تعديل مقال
saveBtn.addEventListener('click', async () => {
  const title = postTitleInput.value.trim();
  const content = editor.innerHTML.trim();

  if (!title || !content) {
    alert("⚠️ من فضلك اكتب عنوان ومحتوى المقال");
    return;
  }

  let mainImageUrl = null;
  if (mainImageInput.files.length > 0) {
    mainImageUrl = await uploadImage(mainImageInput.files[0]);
  }

  if (editingPostId) {
    // تعديل مقال
    const { error } = await supabase.from('posts').update({
      title,
      content,
      ...(mainImageUrl && { main_image_url: mainImageUrl })
    }).eq('id', editingPostId);

    if (error) {
      alert('حدث خطأ أثناء التعديل');
      console.error(error);
    } else {
      alert('✅ تم تعديل المقال بنجاح');
      resetForm();
      await fetchPosts();
      renderPosts(posts);
    }
  } else {
    // إضافة مقال جديد
    const { error } = await supabase.from('posts').insert([
      { title, content, main_image_url: mainImageUrl }
    ]);

    if (error) {
      console.error("❌ خطأ في حفظ المقال:", error);
      alert("حدث خطأ أثناء الحفظ");
      return;
    }

    alert("✅ تم الحفظ بنجاح");
    resetForm();
    await fetchPosts();
    renderPosts(posts);
  }
});

// إعادة تعيين الفورم
function resetForm() {
  postTitleInput.value = '';
  editor.innerHTML = '';
  mainImageInput.value = '';
  editingPostId = null;
  document.getElementById('editorTitle').textContent = 'إضافة مقال جديد';
  saveBtn.textContent = 'حفظ';
}

// إزالة الوسوم من المحتوى لعرض مقتطف نصي
function stripHtml(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}

// جلب المقالات من Supabase
async function fetchPosts() {
  const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });

  if (error) {
    console.error("❌ خطأ في جلب المقالات:", error);
    noPosts.style.display = 'block';
    noPosts.textContent = 'حدث خطأ أثناء جلب المقالات';
    posts = [];
    return;
  }

  posts = data || [];
  if (posts.length === 0) {
    noPosts.style.display = 'block';
    noPosts.textContent = 'لا توجد مقالات بعد';
  } else {
    noPosts.style.display = 'none';
  }
}

// عرض المقالات على الصفحة
function renderPosts(postsList) {
  postsContainer.innerHTML = '';

  if (postsList.length === 0) {
    noPosts.style.display = 'block';
    noPosts.textContent = 'لا توجد مقالات مطابقة للبحث';
    return;
  } else {
    noPosts.style.display = 'none';
  }

  postsList.forEach(post => {
    const card = document.createElement('div');
    card.className = 'post-card';
    card.dataset.id = post.id; // حفظ ID في الكارت
    card.innerHTML = `
      <div class="post-thumb">
        ${post.main_image_url ? `<img src="${post.main_image_url}" alt="صورة المقال">` : `<div>لا صورة</div>`}
      </div>
      <div class="post-meta">
        <h4>${post.title}</h4>
        <p>${stripHtml(post.content).slice(0, 120)}...</p>
        <div class="post-actions">
          <button class="edit-btn">✏ تعديل</button>
          <button class="delete-btn">🗑 حذف</button>
        </div>
      </div>
    `;
    postsContainer.appendChild(card);
  });

  // ربط أحداث أزرار التعديل والحذف
  postsContainer.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const card = e.target.closest('.post-card');
      const id = card ? card.dataset.id : null;
      if (!id) {
        console.error("❌ لم يتم العثور على ID للمقال");
        return;
      }
      editPost(id);
    });
  });

  postsContainer.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const card = e.target.closest('.post-card');
      const id = card ? card.dataset.id : null;
      if (!id) {
        console.error("❌ لم يتم العثور على ID للمقال");
        return;
      }
      deletePost(id);
    });
  });
}

// تعديل مقال
function editPost(id) {
  const post = posts.find(p => p.id == id);
  if (!post) return alert('المقال غير موجود');

  postTitleInput.value = post.title;
  editor.innerHTML = post.content;
  editingPostId = id;
  document.getElementById('editorTitle').textContent = 'تعديل مقال';
  saveBtn.textContent = 'حفظ التعديلات';
}

// حذف مقال
function deletePost(id) {
  if (!confirm('هل تريد حذف هذا المقال؟')) return;

  supabase.from('posts').delete().eq('id', id)
    .then(({ error }) => {
      if (error) {
        alert('حدث خطأ أثناء الحذف');
        console.error(error);
      } else {
        posts = posts.filter(p => p.id != id);
        renderPosts(posts);
      }
    });
}

// تحميل المقالات عند بدء الصفحة
document.addEventListener('DOMContentLoaded', async () => {
  await fetchPosts();
  renderPosts(posts);
});
