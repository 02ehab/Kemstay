import { supabase } from './supabase.js';

window.openMenu = function() {
  document.getElementById("sideMenu").classList.add("open");
}

window.closeMenu = function() {
  document.getElementById("sideMenu").classList.remove("open");
}

// دالة لقراءة باراميتر من رابط الصفحة
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

async function loadArticle() {
  const id = getQueryParam('id');
  if (!id) {
    alert('لم يتم تحديد المقال.');
    return;
  }

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('خطأ في جلب المقال:', error);
    alert('حدث خطأ في تحميل المقال.');
    return;
  }

  // عرض بيانات المقال في الصفحة
  document.getElementById('articleTitle').textContent = data.title;
  if(data.main_image_url){
    document.getElementById('articleImage').src = data.main_image_url;
    document.getElementById('articleImage').alt = data.title;
  }
  document.getElementById('articleContent').innerHTML = data.content;
}

document.addEventListener('DOMContentLoaded', () => {
  loadArticle();
});
