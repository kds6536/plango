import { useRouter } from 'next/router';
import Link from 'next/link';

const menuItems = [
  { href: '/admin/dashboard', label: '대시보드' },
  { href: '/admin/api-settings', label: 'API 설정' },
  { href: '/admin/site-stats', label: '사이트 통계' },
  { href: '/admin/content-manage', label: '콘텐츠 관리' },
];

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <aside className="w-64 bg-white shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary-600">Plan Go 관리</h1>
      </div>
      <nav className="mt-6">
        <ul>
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-600 ${
                  router.pathname === item.href
                    ? 'bg-primary-50 text-primary-600 border-r-4 border-primary-600'
                    : ''
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-0 w-64 p-6">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
        >
          로그아웃
        </button>
      </div>
    </aside>
  );
} 