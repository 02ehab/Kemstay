import { supabase } from './supabase.js';

window.openMenu = function() {
  document.getElementById("sideMenu").classList.add("open");
}

window.closeMenu = function() {
  document.getElementById("sideMenu").classList.remove("open");
}

document.addEventListener('DOMContentLoaded', async () => {
  const heroSection = document.querySelector('.hero');
  heroSection.innerHTML = '<p>⏳ جاري تحميل المقالات...</p>';

  try {
    const { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("❌ خطأ في جلب المقالات:", error);
      heroSection.innerHTML = '<p>⚠️ حدث خطأ أثناء تحميل المقالات</p>';
      return;
    }

    if (!posts.length) {
      heroSection.innerHTML = '<p>📭 لا توجد مقالات بعد</p>';
      return;
    }

    heroSection.innerHTML = posts.map(post => `
      <div class="post-card">
        ${post.main_image_url ? `<img src="${post.main_image_url}" alt="${post.title}">` : ''}
        <div class="post-content">
          <h2><a href="article_view.html?id=${post.id}">${post.title}</a></h2>
          <p>
            ${post.content.replace(/<[^>]*>?/gm, '').slice(0, 100)}...
          </p>
          <a href="article_view.html?id=${post.id}" class="read-more">اقرأ المزيد</a>
        </div>
      </div>
    `).join('');

  } catch (err) {
    console.error('❌ خطأ غير متوقع:', err);
    heroSection.innerHTML = '<p>⚠️ حدث خطأ أثناء تحميل المقالات</p>';
  }
});
