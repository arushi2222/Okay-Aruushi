const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-toggle__icon');
const root = document.documentElement;
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  root.setAttribute('data-theme', savedTheme);
  themeIcon.textContent = savedTheme === 'dark' ? '☾' : '☀︎';
}

themeToggle?.addEventListener('click', () => {
  const currentTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', currentTheme);
  localStorage.setItem('theme', currentTheme);
  themeIcon.textContent = currentTheme === 'dark' ? '☾' : '☀︎';
});

const searchInput = document.getElementById('search-input');
const chips = document.querySelectorAll('.chip');
const articles = document.querySelectorAll('#research-list .card');
let activeFilter = 'all';

function applyFilters() {
  const query = (searchInput?.value || '').trim().toLowerCase();

  articles.forEach((article) => {
    const matchesFilter = activeFilter === 'all' || article.dataset.category === activeFilter;
    const matchesSearch =
      !query || (article.dataset.search || '').toLowerCase().includes(query) || article.textContent.toLowerCase().includes(query);

    article.style.display = matchesFilter && matchesSearch ? 'block' : 'none';
  });
}

chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    chips.forEach((item) => item.classList.remove('is-active'));
    chip.classList.add('is-active');
    activeFilter = chip.dataset.filter;
    applyFilters();
  });
});

searchInput?.addEventListener('input', applyFilters);

const progressBar = document.querySelector('.reading-progress');
if (progressBar) {
  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
    progressBar.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}
