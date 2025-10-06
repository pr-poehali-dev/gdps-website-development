import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

type Page = 'home' | 'profile' | 'levels' | 'register' | 'login' | 'download';

function Index() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [user, setUser] = useState<{ username: string; id: number } | null>(null);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setPage={setCurrentPage} />;
      case 'profile':
        return <ProfilePage user={user} />;
      case 'levels':
        return <LevelsPage />;
      case 'register':
        return <RegisterPage setPage={setCurrentPage} setUser={setUser} />;
      case 'login':
        return <LoginPage setPage={setCurrentPage} setUser={setUser} />;
      case 'download':
        return <DownloadPage />;
      default:
        return <HomePage setPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen geometric-bg">
      <nav className="border-b-2 border-primary/30 backdrop-blur-sm bg-background/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <img 
                src="https://cdn.poehali.dev/files/c68fd5c9-89ce-4d7f-97f2-383d0422d38e.png" 
                alt="GDPS fin0" 
                className="w-10 h-10 neon-glow"
              />
              <h1 className="text-2xl font-black gradient-text">GDPS FIN0</h1>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <NavButton icon="Home" label="Главная" active={currentPage === 'home'} onClick={() => setCurrentPage('home')} />
              <NavButton icon="Download" label="Скачать" active={currentPage === 'download'} onClick={() => setCurrentPage('download')} />
              {user ? (
                <NavButton icon="User" label="Профиль" active={currentPage === 'profile'} onClick={() => setCurrentPage('profile')} />
              ) : (
                <>
                  <NavButton icon="LogIn" label="Вход" active={currentPage === 'login'} onClick={() => setCurrentPage('login')} />
                  <Button 
                    className="neon-border bg-primary/20 hover:bg-primary/30 text-primary font-bold"
                    onClick={() => setCurrentPage('register')}
                  >
                    Регистрация
                  </Button>
                </>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-primary"
              onClick={() => {}}
            >
              <Icon name="Menu" size={24} />
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {renderPage()}
      </main>

      <footer className="border-t-2 border-primary/30 mt-20 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">© 2025 GDPS fin0. Приватный сервер Geometry Dash</p>
          <div className="flex justify-center gap-6 mt-4">
            <Icon name="Github" size={20} className="text-primary cursor-pointer hover:scale-110 transition-transform" />
            <Icon name="MessageCircle" size={20} className="text-secondary cursor-pointer hover:scale-110 transition-transform" />
            <Icon name="Youtube" size={20} className="text-accent cursor-pointer hover:scale-110 transition-transform" />
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavButton({ icon, label, active, onClick }: { icon: string; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all ${
        active 
          ? 'text-primary neon-glow font-bold' 
          : 'text-foreground/70 hover:text-primary hover:scale-105'
      }`}
    >
      <Icon name={icon} size={18} />
      <span className="text-sm">{label}</span>
    </button>
  );
}

function HomePage({ setPage }: { setPage: (page: Page) => void }) {
  return (
    <div className="space-y-16">
      <section className="text-center py-20">
        <h1 className="text-6xl md:text-8xl font-black gradient-text mb-6 animate-fade-in">
          GDPS FIN0
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Приватный сервер Geometry Dash с тысячами пользовательских уровней
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button 
            size="lg"
            className="neon-border bg-primary/20 hover:bg-primary/30 text-primary font-bold text-lg px-8 hover-scale"
            onClick={() => setPage('register')}
          >
            <Icon name="Sparkles" size={20} className="mr-2" />
            Начать играть
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="border-secondary text-secondary hover:bg-secondary/10 font-bold text-lg px-8 hover-scale"
            onClick={() => setPage('download')}
          >
            <Icon name="Download" size={20} className="mr-2" />
            Скачать
          </Button>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <StatCard icon="Users" value="12,453" label="Игроков" color="primary" />
        <StatCard icon="Layers" value="8,721" label="Уровней" color="secondary" />
        <StatCard icon="Zap" value="99.9%" label="Аптайм" color="accent" />
      </section>

      <section>
        <div className="grid md:grid-cols-3 gap-6">
          <LevelCard 
            title="Neon Paradise"
            author="CyberPlayer"
            difficulty={8}
            downloads={2456}
          />
          <LevelCard 
            title="Digital Dreams"
            author="GeoDash_Pro"
            difficulty={6}
            downloads={1892}
          />
          <LevelCard 
            title="Cyber Rush"
            author="NeonMaster"
            difficulty={9}
            downloads={3241}
          />
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon, value, label, color }: { icon: string; value: string; label: string; color: string }) {
  return (
    <Card className="neon-border bg-card/50 backdrop-blur-sm p-6 hover-scale">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg bg-${color}/20`}>
          <Icon name={icon} size={32} className={`text-${color} neon-glow`} />
        </div>
        <div>
          <div className="text-3xl font-black text-foreground">{value}</div>
          <div className="text-sm text-muted-foreground">{label}</div>
        </div>
      </div>
    </Card>
  );
}

function LevelCard({ title, author, difficulty, downloads }: { title: string; author: string; difficulty: number; downloads: number }) {
  return (
    <Card className="neon-border bg-card/50 backdrop-blur-sm p-6 hover-scale cursor-pointer group">
      <div className="aspect-square bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-lg mb-4 flex items-center justify-center">
        <Icon name="Sparkles" size={64} className="text-primary/50 group-hover:scale-110 transition-transform neon-glow" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-3">by {author}</p>
      <div className="flex justify-between items-center">
        <Badge variant="outline" className="border-accent text-accent">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i}>{i < difficulty ? '★' : '☆'}</span>
          ))}
        </Badge>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Icon name="Download" size={14} />
          <span>{downloads}</span>
        </div>
      </div>
    </Card>
  );
}

function LevelsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-black gradient-text">Все уровни</h1>
        <div className="flex gap-2">
          <Input placeholder="Поиск..." className="w-64 neon-border bg-card/50" />
          <Button className="neon-border bg-primary/20 hover:bg-primary/30 text-primary">
            <Icon name="Search" size={18} />
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <LevelCard 
            key={i}
            title={`Level ${i + 1}`}
            author={`Player${i + 1}`}
            difficulty={Math.floor(Math.random() * 10) + 1}
            downloads={Math.floor(Math.random() * 5000) + 100}
          />
        ))}
      </div>
    </div>
  );
}

function ProfilePage({ user }: { user: { username: string; id: number } | null }) {
  if (!user) {
    return (
      <div className="text-center py-20">
        <Icon name="UserX" size={64} className="mx-auto mb-4 text-muted-foreground" />
        <h2 className="text-2xl font-bold mb-2">Необходима авторизация</h2>
        <p className="text-muted-foreground">Войдите в аккаунт, чтобы увидеть профиль</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Card className="neon-border bg-card/50 backdrop-blur-sm p-8">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center neon-glow">
            <Icon name="User" size={48} className="text-background" />
          </div>
          <div>
            <h1 className="text-3xl font-black gradient-text">{user.username}</h1>
            <p className="text-muted-foreground">ID: {user.id}</p>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        <StatCard icon="Trophy" value="42" label="Завершено" color="accent" />
        <StatCard icon="Star" value="1,248" label="Звёзд" color="primary" />
        <StatCard icon="Award" value="15" label="Достижений" color="secondary" />
      </div>
    </div>
  );
}

function RegisterPage({ setPage, setUser }: { setPage: (page: Page) => void; setUser: (user: any) => void }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (username && email && password) {
      setUser({ username, id: Math.floor(Math.random() * 10000) });
      setPage('profile');
    }
  };

  return (
    <div className="max-w-md mx-auto py-20">
      <Card className="neon-border bg-card/50 backdrop-blur-sm p-8">
        <h1 className="text-3xl font-black gradient-text mb-6 text-center">Регистрация</h1>
        <div className="space-y-4">
          <div>
            <Label htmlFor="username" className="text-foreground">Имя пользователя</Label>
            <Input 
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="neon-border bg-input mt-2"
              placeholder="CoolPlayer123"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-foreground">Email</Label>
            <Input 
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="neon-border bg-input mt-2"
              placeholder="player@gdps.com"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-foreground">Пароль</Label>
            <Input 
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="neon-border bg-input mt-2"
              placeholder="••••••••"
            />
          </div>
          <Button 
            className="w-full neon-border bg-primary/20 hover:bg-primary/30 text-primary font-bold"
            onClick={handleRegister}
          >
            Создать аккаунт
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Уже есть аккаунт?{' '}
            <span className="text-primary cursor-pointer hover:underline" onClick={() => setPage('login')}>
              Войти
            </span>
          </p>
        </div>
      </Card>
    </div>
  );
}

function LoginPage({ setPage, setUser }: { setPage: (page: Page) => void; setUser: (user: any) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      setUser({ username, id: Math.floor(Math.random() * 10000) });
      setPage('profile');
    }
  };

  return (
    <div className="max-w-md mx-auto py-20">
      <Card className="neon-border bg-card/50 backdrop-blur-sm p-8">
        <h1 className="text-3xl font-black gradient-text mb-6 text-center">Вход</h1>
        <div className="space-y-4">
          <div>
            <Label htmlFor="username" className="text-foreground">Имя пользователя</Label>
            <Input 
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="neon-border bg-input mt-2"
              placeholder="CoolPlayer123"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-foreground">Пароль</Label>
            <Input 
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="neon-border bg-input mt-2"
              placeholder="••••••••"
            />
          </div>
          <Button 
            className="w-full neon-border bg-primary/20 hover:bg-primary/30 text-primary font-bold"
            onClick={handleLogin}
          >
            Войти
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Нет аккаунта?{' '}
            <span className="text-primary cursor-pointer hover:underline" onClick={() => setPage('register')}>
              Зарегистрироваться
            </span>
          </p>
        </div>
      </Card>
    </div>
  );
}

function DownloadPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-black gradient-text mb-4">Скачать GDPS fin0</h1>
        <p className="text-muted-foreground">Выберите версию для вашей платформы</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <DownloadCard 
          platform="Windows"
          icon="Monitor"
          version="v2.2.13"
          size="45 MB"
        />
        <DownloadCard 
          platform="Android"
          icon="Smartphone"
          version="v2.2.13"
          size="38 MB"
        />
        <DownloadCard 
          platform="macOS"
          icon="Laptop"
          version="v2.2.13"
          size="52 MB"
        />
      </div>

      <Card className="neon-border bg-card/50 backdrop-blur-sm p-6">
        <h3 className="text-xl font-bold mb-4 text-primary">Системные требования</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-center gap-2">
            <Icon name="Check" size={16} className="text-accent" />
            <span>Windows 7+ / macOS 10.12+ / Android 5.0+</span>
          </li>
          <li className="flex items-center gap-2">
            <Icon name="Check" size={16} className="text-accent" />
            <span>2 GB RAM минимум</span>
          </li>
          <li className="flex items-center gap-2">
            <Icon name="Check" size={16} className="text-accent" />
            <span>Интернет для онлайн-функций</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}

function DownloadCard({ platform, icon, version, size }: { platform: string; icon: string; version: string; size: string }) {
  return (
    <Card className="neon-border bg-card/50 backdrop-blur-sm p-6 hover-scale text-center">
      <Icon name={icon} size={48} className="mx-auto mb-4 text-primary neon-glow" />
      <h3 className="text-xl font-bold mb-2">{platform}</h3>
      <p className="text-sm text-muted-foreground mb-1">{version}</p>
      <p className="text-xs text-muted-foreground mb-4">{size}</p>
      <Button className="w-full neon-border bg-primary/20 hover:bg-primary/30 text-primary font-bold">
        <Icon name="Download" size={16} className="mr-2" />
        Скачать
      </Button>
    </Card>
  );
}

export default Index;