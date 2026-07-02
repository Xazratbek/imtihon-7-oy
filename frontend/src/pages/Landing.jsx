import { Link } from "react-router-dom";
import {
  GraduationCap,
  FileText,
  Search,
  ThumbsUp,
  BarChart3,
  Sparkles,
  Upload,
  FolderTree,
  Share2,
  MessageSquareWarning,
  CopyX,
  FileSearch,
  KeyRound,
  FileUp,
  BookOpen,
  Tags,
  Download,
  MonitorSmartphone,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user } = useAuth();
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold text-gray-900">
          <GraduationCap className="h-6 w-6" />
          EduShare
        </Link>
        <div className="hidden items-center gap-8 text-sm text-gray-600 md:flex">
          <a href="#imkoniyatlar" className="hover:text-gray-900">Imkoniyatlar</a>
          <a href="#qanday-ishlaydi" className="hover:text-gray-900">Qanday ishlaydi</a>
          <a href="#ai" className="hover:text-gray-900">AI vositalar</a>
          <a href="#hamjamiyat" className="hover:text-gray-900">Hamjamiyat</a>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <Link
              to="/dashboard"
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                Kirish
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                Boshlash
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

function DashboardMockup() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-3 shadow-lg">
      <div className="flex gap-3">
        <div className="hidden w-36 shrink-0 flex-col gap-1 rounded-xl bg-gray-50 p-3 text-xs text-gray-600 sm:flex">
          <div className="mb-2 flex items-center gap-1.5 font-semibold text-gray-900">
            <GraduationCap className="h-4 w-4" /> EduShare
          </div>
          {["Dashboard", "Materiallar", "Fanlar", "AI Xulosa", "AI Referat"].map((item, i) => (
            <div key={item} className={`rounded-lg px-2 py-1.5 ${i === 0 ? "bg-white font-medium text-gray-900 shadow-sm" : ""}`}>
              {item}
            </div>
          ))}
        </div>
        <div className="flex-1 space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {[
              ["Materiallar", "128"],
              ["Yuklab olishlar", "1 024"],
              ["Layklar", "356"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-gray-200 p-3">
                <div className="text-[10px] text-gray-500">{label}</div>
                <div className="text-lg font-semibold text-gray-900">{value}</div>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-gray-200 p-3">
            <div className="mb-2 text-[10px] font-medium text-gray-500">SO'NGGI MATERIALLAR</div>
            {["Django REST Framework konspekt", "Ma'lumotlar bazasi ma'ruza", "Ingliz tili prezentatsiya"].map((row) => (
              <div key={row} className="flex items-center justify-between border-t border-gray-100 py-2 text-xs">
                <span className="text-gray-700">{row}</span>
                <span className="text-gray-400">PDF</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ children, sub }) {
  return (
    <div className="mb-12 text-center">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900">{children}</h2>
      {sub && <p className="mt-3 text-gray-500">{sub}</p>}
    </div>
  );
}

function Card({ icon: Icon, title, children }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
        <Icon className="h-5 w-5 text-gray-700" />
      </div>
      <h3 className="mb-2 font-semibold text-gray-900">{title}</h3>
      <p className="text-sm leading-relaxed text-gray-500">{children}</p>
    </div>
  );
}

export default function Landing() {
  return (
    <div className="bg-white">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
        <div>
          <span className="inline-block rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600">
            Talabalar uchun bilim almashish platformasi
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl">
            Bilim ulashing. Tezroq o'rganing.
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-gray-500">
            Ma'ruza konspektlari, PDF, prezentatsiya va o'quv materiallarini yuklang. Boshqa
            talabalar ulashgan materiallarni toping va AI yordamida xulosa, konspekt hamda
            referatlar yarating.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/register"
              className="flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 font-medium text-white hover:bg-gray-800"
            >
              Boshlash <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/login"
              className="rounded-xl border border-gray-200 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50"
            >
              Materiallarni ko'rish
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-1.5"><FileText className="h-4 w-4" /> PDF, DOCX, PPTX</span>
            <span className="flex items-center gap-1.5"><Sparkles className="h-4 w-4" /> AI xulosalar</span>
            <span className="flex items-center gap-1.5"><ThumbsUp className="h-4 w-4" /> Hamjamiyat baholari</span>
          </div>
        </div>
        <DashboardMockup />
      </section>

      {/* Social proof */}
      <section id="hamjamiyat" className="mx-auto max-w-7xl px-6 py-16">
        <SectionTitle>Talabalar uchun yaratilgan</SectionTitle>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            ["1000+", "Ulashilgan materiallar"],
            ["500+", "Talabalar"],
            ["20+", "Fanlar"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
              <div className="text-3xl font-bold text-gray-900">{value}</div>
              <div className="mt-1 text-sm text-gray-500">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Problem */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle>O'quv materiallari har joyda sochilib yotibdi</SectionTitle>
          <div className="grid gap-6 md:grid-cols-3">
            <Card icon={MessageSquareWarning} title="Telegram tartibsizligi">
              Qimmatli materiallar guruh chatlari ichida yo'qolib ketadi.
            </Card>
            <Card icon={CopyX} title="Takroriy mehnat">
              Bir xil referat va konspektlar qayta-qayta noldan yoziladi.
            </Card>
            <Card icon={FileSearch} title="Qidirish qiyinchiligi">
              Foydali konspekt va fayllarni topish juda ko'p vaqt oladi.
            </Card>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section id="imkoniyatlar" className="mx-auto max-w-7xl px-6 py-20">
        <SectionTitle>Barcha o'quv bilimlari — bitta joyda</SectionTitle>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card icon={FileText} title="Fayl almashish">
            PDF, DOCX va PPTX materiallarni yuklang va toping.
          </Card>
          <Card icon={Search} title="Aqlli qidiruv">
            Fan, teg va kalit so'zlar orqali kerakli manbani toping.
          </Card>
          <Card icon={ThumbsUp} title="Baholash">
            Like va dislike orqali sifatli kontent ajralib turadi.
          </Card>
          <Card icon={BarChart3} title="Statistika">
            Yuklab olishlar va mashhurlikni kuzatib boring.
          </Card>
        </div>
      </section>

      {/* AI */}
      <section id="ai" className="mx-auto max-w-7xl px-6 py-20">
        <SectionTitle sub="AI — asosiy mahsulot emas, foydali qo'shimcha.">
          AI yordamida o'rganish
        </SectionTitle>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
              <Sparkles className="h-5 w-5 text-gray-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">AI Xulosa</h3>
            <p className="mt-2 text-gray-500">Hujjatni yuklang va qisqacha xulosa oling.</p>
            <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm">
              <div className="font-medium text-gray-900">Asosiy mavzu:</div>
              <p className="text-gray-600">Django REST Framework'da autentifikatsiya usullari</p>
              <div className="mt-3 font-medium text-gray-900">Muhim tushunchalar:</div>
              <p className="text-gray-600">JWT, access token, refresh token, permission classes</p>
              <div className="mt-3 font-medium text-gray-900">Xulosa:</div>
              <p className="text-gray-600">Material JWT orqali statless autentifikatsiya qurishni tushuntiradi...</p>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
              <FileText className="h-5 w-5 text-gray-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">AI Referat generatori</h3>
            <p className="mt-2 text-gray-500">Mavzu va hajm asosida referat, konspekt yoki mustaqil ish yarating.</p>
            <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Mavzu</span>
                <span className="font-medium text-gray-900">Sun'iy intellekt</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 py-2">
                <span className="text-gray-500">Turi</span>
                <span className="font-medium text-gray-900">Referat</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Hajm</span>
                <span className="font-medium text-gray-900">5 bet</span>
              </div>
              <p className="mt-2 text-gray-600">Kirish: Sun'iy intellekt — bu inson tafakkurini modellashtiruvchi...</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="qanday-ishlaydi" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle>Qanday ishlaydi</SectionTitle>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              [Upload, "1. Material yuklang", "PDF, DOCX yoki PPTX faylni yuklang."],
              [FolderTree, "2. Tartiblang", "Fan va teglarni tanlang."],
              [Share2, "3. Ulashing va o'rganing", "Boshqa talabalar materialingizdan foydalanadi."],
            ].map(([Icon, title, text]) => (
              <div key={title} className="relative rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-900">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900">{title}</h3>
                <p className="mt-2 text-sm text-gray-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionTitle>Texnik imkoniyatlar</SectionTitle>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card icon={KeyRound} title="JWT autentifikatsiya">Xavfsiz token asosidagi kirish tizimi.</Card>
          <Card icon={FileUp} title="Fayl yuklash">PDF, DOCX, PPTX formatlarini qo'llab-quvvatlash.</Card>
          <Card icon={BookOpen} title="Fanlar bo'yicha tartiblash">Har bir material aniq fanga biriktiriladi.</Card>
          <Card icon={Tags} title="Teg tizimi">Qo'lda va AI yordamida teglash.</Card>
          <Card icon={Download} title="Yuklab olish statistikasi">Har bir material mashhurligi kuzatiladi.</Card>
          <Card icon={MonitorSmartphone} title="Moslashuvchan interfeys">Telefon va kompyuterda qulay ishlaydi.</Card>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-3xl border border-gray-200 bg-gray-50 p-12 text-center shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900">Bugundan bilim ulashishni boshlang</h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-500">
            O'sib borayotgan akademik hamjamiyatga qo'shiling va o'rganishni hamma uchun osonlashtiring.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link to="/register" className="rounded-xl bg-gray-900 px-6 py-3 font-medium text-white hover:bg-gray-800">
              Hisob yaratish
            </Link>
            <Link to="/login" className="rounded-xl border border-gray-200 bg-white px-6 py-3 font-medium text-gray-700 hover:bg-gray-100">
              Platformani ko'rish
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 font-semibold text-gray-900">
              <GraduationCap className="h-5 w-5" /> EduShare
            </div>
            <p className="mt-3 text-sm text-gray-500">Talabalar uchun markazlashgan bilim almashish platformasi.</p>
          </div>
          <div>
            <div className="mb-3 text-sm font-semibold text-gray-900">Mahsulot</div>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#imkoniyatlar" className="hover:text-gray-900">Imkoniyatlar</a></li>
              <li><a href="#ai" className="hover:text-gray-900">AI vositalar</a></li>
              <li><Link to="/materiallar" className="hover:text-gray-900">Materiallar</Link></li>
            </ul>
          </div>
          <div>
            <div className="mb-3 text-sm font-semibold text-gray-900">Resurslar</div>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="/api/docs/" className="hover:text-gray-900">Hujjatlar (API)</a></li>
              <li><a href="#qanday-ishlaydi" className="hover:text-gray-900">Yordam markazi</a></li>
            </ul>
          </div>
          <div>
            <div className="mb-3 text-sm font-semibold text-gray-900">Kompaniya</div>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#hamjamiyat" className="hover:text-gray-900">Biz haqimizda</a></li>
              <li><a href="mailto:info@edushare.uz" className="hover:text-gray-900">Aloqa</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 py-6 text-center text-sm text-gray-400">
          © EduShare. Barcha huquqlar himoyalangan.
        </div>
      </footer>
    </div>
  );
}
