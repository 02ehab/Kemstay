// بسيط وقراءة/كتابة من localStorage
const LS_KEY = 'simple_blog_posts_v1';

const newPostBtn = document.getElementById('newPostBtn');
const editorSection = document.getElementById('editorSection');
const editorTitle = document.getElementById('editorTitle');
const mainImageInput = document.getElementById('mainImageInput');
const mainImgPreview = document.getElementById('mainImgPreview');
const postTitleInput = document.getElementById('postTitle');
const editor = document.getElementById('editor');
const insertImageBtn = document.getElementById('insertImageBtn');
const inlineImageInput = document.getElementById('inlineImageInput');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');
const postsContainer = document.getElementById('postsContainer');
const noPosts = document.getElementById('noPosts');
const refreshBtn = document.getElementById('refreshBtn');

let posts = [];
let editingId = null;
let mainImageData = null;

// إعداد الأدوات الصغيرة للمحرر
document.querySelectorAll('.editor-toolbar button[data-cmd]').forEach(btn=>{
  btn.addEventListener('click', ()=> {
    const cmd = btn.getAttribute('data-cmd');
    document.execCommand(cmd, false, null);
    editor.focus();
  });
});

// افتح اختيار الصور داخل الوصف
insertImageBtn.addEventListener('click', ()=> inlineImageInput.click());
inlineImageInput.addEventListener('change', handleInlineImageFiles);

// رفع الصورة الرئيسية - عرض معاينة وتحويل ل base64
mainImageInput.addEventListener('change', async (e)=>{
  const f = e.target.files[0];
  if(!f) return;
  mainImageData = await fileToBase64(f);
  mainImgPreview.innerHTML = `<img src="${mainImageData}" alt="preview">`;
});

// تحويل الملف لbase64
function fileToBase64(file){
  return new Promise((res, rej)=>{
    const reader = new FileReader();
    reader.onload = ()=> res(reader.result);
    reader.onerror = ()=> rej();
    reader.readAsDataURL(file);
  });
}

// إدراج صور داخل المحرر (للكثير من الصور)
async function handleInlineImageFiles(e){
  const files = Array.from(e.target.files || []);
  for(const f of files){
    const data = await fileToBase64(f);
    insertImageAtCursor(data);
  }
  inlineImageInput.value = '';
}

// إدراج صورة عند مؤشر الكتابة
function insertImageAtCursor(src){
  const img = document.createElement('img');
  img.src = src;
  img.style.maxWidth = '100%';
  img.style.display = 'block';
  img.style.margin = '8px 0';
  const sel = window.getSelection();
  if(!sel || !sel.rangeCount){ editor.appendChild(img); return; }
  const range = sel.getRangeAt(0);
  range.insertNode(img);
  // نقل المؤشر بعد الصورة
  range.setStartAfter(img);
  sel.removeAllRanges();
  sel.addRange(range);
  editor.focus();
}

// حفظ البوست (جديد أو تعديل)
saveBtn.addEventListener('click', ()=>{
  const title = postTitleInput.value.trim();
  const content = editor.innerHTML.trim();

  if(!title){
    alert('من فضلك اكتب عنوان البوست.');
    return;
  }

  // تجهيز الكائن
  const postObj = {
    id: editingId || Date.now().toString(),
    title,
    content,
    mainImage: mainImageData || null,
    updatedAt: new Date().toISOString()
  };

  if(editingId){
    // تعديل
    posts = posts.map(p=> p.id === editingId ? {...p, ...postObj} : p);
  } else {
    postObj.createdAt = new Date().toISOString();
    posts.unshift(postObj); // أضف في الأعلى
  }

  saveToStorage();
  resetEditor();
  renderPosts();
});

// إلغاء
cancelBtn.addEventListener('click', ()=>{
  resetEditor();
});

// زر إضافة جديد
newPostBtn.addEventListener('click', ()=> {
  openEditorForNew();
});

// زر تحديث
refreshBtn.addEventListener('click', ()=> renderPosts());

// تهيئة القراءة من localStorage
function loadFromStorage(){
  try{
    const raw = localStorage.getItem(LS_KEY);
    posts = raw ? JSON.parse(raw) : [];
  }catch(e){
    posts = [];
  }
}
function saveToStorage(){
  localStorage.setItem(LS_KEY, JSON.stringify(posts));
}

// عرض البوستات
function renderPosts(){
  postsContainer.innerHTML = '';
  if(posts.length === 0){
    noPosts.style.display = 'block';
    return;
  }
  noPosts.style.display = 'none';

  posts.forEach(post=>{
    const card = document.createElement('div');
    card.className = 'post-card';

    const thumb = document.createElement('div');
    thumb.className = 'post-thumb';
    thumb.innerHTML = post.mainImage ? `<img src="${post.mainImage}" alt="">` : `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#aaa">لا صورة</div>`;

    const meta = document.createElement('div');
    meta.className = 'post-meta';
    meta.innerHTML = `<h4>${escapeHtml(post.title)}</h4>
                      <p>${stripHtml(post.content, 120)}</p>`;

    const actions = document.createElement('div');
    actions.className = 'post-actions';

    const viewBtn = document.createElement('button');
    viewBtn.className = 'small-btn';
    viewBtn.textContent = 'عرض';
    viewBtn.onclick = ()=> openViewer(post);

    const editBtn = document.createElement('button');
    editBtn.className = 'small-btn';
    editBtn.textContent = 'تعديل';
    editBtn.onclick = ()=> openEditorForEdit(post.id);

    const delBtn = document.createElement('button');
    delBtn.className = 'small-btn danger';
    delBtn.textContent = 'حذف';
    delBtn.onclick = ()=> {
      if(confirm('هل أنت متأكد من حذف هذا البوست؟')) {
        posts = posts.filter(p=> p.id !== post.id);
        saveToStorage();
        renderPosts();
      }
    };

    actions.appendChild(viewBtn);
    actions.appendChild(editBtn);
    actions.appendChild(delBtn);

    meta.appendChild(actions);

    card.appendChild(thumb);
    card.appendChild(meta);

    postsContainer.appendChild(card);
  });
}

// فتح محرر جديد
function openEditorForNew(){
  editingId = null;
  editorTitle.textContent = 'إضافة بوست جديد';
  mainImageData = null;
  mainImgPreview.innerHTML = '';
  postTitleInput.value = '';
  editor.innerHTML = '';
  editorSection.scrollIntoView({behavior:'smooth'});
}

// فتح محرر للتعديل
function openEditorForEdit(id){
  const post = posts.find(p=>p.id === id);
  if(!post) return alert('البوست غير موجود');
  editingId = id;
  editorTitle.textContent = 'تعديل البوست';
  mainImageData = post.mainImage || null;
  mainImgPreview.innerHTML = mainImageData ? `<img src="${mainImageData}" alt="preview">` : '';
  postTitleInput.value = post.title;
  editor.innerHTML = post.content || '';
  editorSection.scrollIntoView({behavior:'smooth'});
}

// إعادة ضبط المحرر
function resetEditor(){
  editingId = null;
  mainImageData = null;
  mainImgPreview.innerHTML = '';
  postTitleInput.value = '';
  editor.innerHTML = '';
  editorTitle.textContent = 'إضافة بوست جديد';
  mainImageInput.value = '';
}

// معاينة / عرض محتوى (بسيط)
function openViewer(post){
  // نافذة بسيطة تعرض البوست
  const w = window.open('', '_blank');
  const html = `
    <!doctype html>
    <html lang="ar" dir="rtl">
      <head>
        <meta charset="utf-8">
        <title>${escapeHtml(post.title)}</title>
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <style>body{font-family:Arial;padding:20px;direction:rtl} img{max-width:100%;height:auto}</style>
      </head>
      <body>
        <h1>${escapeHtml(post.title)}</h1>
        ${post.mainImage ? `<img src="${post.mainImage}" alt="" style="max-width:400px;display:block;margin-bottom:12px">` : ''}
        <div>${post.content}</div>
      </body>
    </html>
  `;
  w.document.open();
  w.document.write(html);
  w.document.close();
}

// أدوات مساعدة
function stripHtml(html, maxLen=200){
  const div = document.createElement('div');
  div.innerHTML = html || '';
  const text = div.textContent || div.innerText || '';
  if(text.length <= maxLen) return escapeHtml(text);
  return escapeHtml(text.slice(0, maxLen)) + '...';
}
function escapeHtml(s){
  return (s+'').replace(/[&<>"']/g, function(m){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]; });
}

// تحميل البيانات عند بدء التشغيل
loadFromStorage();
renderPosts();

// دعم لصق الصور مباشرة في المحرر (مثلاً من سكرين شوت)
editor.addEventListener('paste', (e)=>{
  const items = (e.clipboardData && e.clipboardData.items) ? e.clipboardData.items : [];
  for(const item of items){
    if(item.type.indexOf('image') !== -1){
      const file = item.getAsFile();
      if(file){
        fileToBase64(file).then(data => insertImageAtCursor(data));
      }
    }
  }
});