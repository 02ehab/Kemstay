import { supabase } from './supabase.js';

const postTitleInput = document.getElementById('postTitle');
const mainImageInput = document.getElementById('mainImageInput');
const editor = document.getElementById('editor');
const saveBtn = document.getElementById('saveBtn');
const postsContainer = document.getElementById('postsContainer');
const noPosts = document.getElementById('noPosts');

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

  const { error } = await supabase.from('posts').insert([
    { title, content, main_image_url: mainImageUrl }
  ]);

  if (error) {
    console.error("❌ خطأ في حفظ المقال:", error);
    alert("حدث خطأ أثناء الحفظ");
    return;
  }

  alert("✅ تم الحفظ بنجاح");
  postTitleInput.value = '';
  editor.innerHTML = '';
  mainImageInput.value = '';
  renderPosts();
});

function stripHtml(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}

async function renderPosts() {
  postsContainer.innerHTML = '';
  const { data: posts, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });

  if (error) {
    console.error("❌ خطأ في جلب المقالات:", error);
    noPosts.style.display = 'block';
    noPosts.textContent = 'حدث خطأ أثناء جلب المقالات';
    return;
  }

  if (!posts.length) {
    noPosts.style.display = 'block';
    noPosts.textContent = 'لا توجد مقالات بعد';
    return;
  }

  noPosts.style.display = 'none';

  posts.forEach(post => {
    const card = document.createElement('div');
    card.className = 'post-card';
    card.innerHTML = `
      <div class="post-thumb">
        ${post.main_image_url ? `<img src="${post.main_image_url}" alt="">` : `<div>لا صورة</div>`}
      </div>
      <div class="post-meta">
        <h4>${post.title}</h4>
        <p>${stripHtml(post.content).slice(0, 120)}...</p>
      </div>
    `;
    postsContainer.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderPosts();
});
