import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

type Page = 'home' | 'profile' | 'levels' | 'register' | 'login' | 'download' | 'music' | 'reset-password';

function Index() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [user, setUser] = useState<{ username: string; id: number } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      case 'music':
        return <MusicPage user={user} />;
      case 'reset-password':
        return <ResetPasswordPage setPage={setCurrentPage} />;
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
              <NavButton icon="Music" label="Музыка" active={currentPage === 'music'} onClick={() => setCurrentPage('music')} />
              <NavButton icon="Download" label="Скачать" active={currentPage === 'download'} onClick={() => setCurrentPage('download')} />
              <a href="https://t.me/+WpNBih78jjAxMTBi" target="_blank" rel="noopener noreferrer">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-foreground hover:text-primary hover:bg-primary/5">
                  <Icon name="Send" size={18} />
                  <span className="text-sm">Telegram</span>
                </button>
              </a>
              {user ? (
                <>
                  <NavButton icon="User" label="Профиль" active={currentPage === 'profile'} onClick={() => setCurrentPage('profile')} />
                  <Button 
                    variant="outline"
                    className="border-red-500 text-red-500 hover:bg-red-500/10 font-bold"
                    onClick={() => {
                      setUser(null);
                      setCurrentPage('home');
                    }}
                  >
                    <Icon name="LogOut" size={16} className="mr-2" />
                    Выйти
                  </Button>
                </>
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
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-primary/30 bg-background/95 backdrop-blur-sm animate-in slide-in-from-top duration-1000">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              <button 
                className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-foreground hover:bg-primary/10 w-full text-left"
                onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }}
              >
                <Icon name="Home" size={20} />
                <span>Главная</span>
              </button>
              <button 
                className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-foreground hover:bg-primary/10 w-full text-left"
                onClick={() => { setCurrentPage('music'); setIsMobileMenuOpen(false); }}
              >
                <Icon name="Music" size={20} />
                <span>Музыка</span>
              </button>
              <button 
                className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-foreground hover:bg-primary/10 w-full text-left"
                onClick={() => { setCurrentPage('download'); setIsMobileMenuOpen(false); }}
              >
                <Icon name="Download" size={20} />
                <span>Скачать</span>
              </button>
              <a href="https://t.me/+WpNBih78jjAxMTBi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-foreground hover:bg-primary/10 w-full">
                <Icon name="Send" size={20} />
                <span>Telegram</span>
              </a>
              {user ? (
                <>
                  <button 
                    className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-foreground hover:bg-primary/10 w-full text-left"
                    onClick={() => { setCurrentPage('profile'); setIsMobileMenuOpen(false); }}
                  >
                    <Icon name="User" size={20} />
                    <span>Профиль</span>
                  </button>
                  <Button 
                    variant="outline"
                    className="border-red-500 text-red-500 hover:bg-red-500/10 font-bold w-full justify-start"
                    onClick={() => {
                      setUser(null);
                      setCurrentPage('home');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <Icon name="LogOut" size={20} className="mr-2" />
                    Выйти
                  </Button>
                </>
              ) : (
                <>
                  <button 
                    className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-foreground hover:bg-primary/10 w-full text-left"
                    onClick={() => { setCurrentPage('login'); setIsMobileMenuOpen(false); }}
                  >
                    <Icon name="LogIn" size={20} />
                    <span>Вход</span>
                  </button>
                  <Button 
                    className="neon-border bg-primary/20 hover:bg-primary/30 text-primary font-bold w-full"
                    onClick={() => { setCurrentPage('register'); setIsMobileMenuOpen(false); }}
                  >
                    Регистрация
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      <main className="container mx-auto px-4 py-8">
        {renderPage()}
      </main>

      <footer className="border-t-2 border-primary/30 mt-20 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">© 2025 GDPS fin0. Приватный сервер Geometry Dash</p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="https://t.me/+WpNBih78jjAxMTBi" target="_blank" rel="noopener noreferrer">
              <Icon name="Send" size={20} className="text-primary cursor-pointer hover:scale-110 transition-transform" />
            </a>
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
          Приватный сервер Geometry Dash с тысячами пользовательских уровней. Поддержка модификации Geode на ПК!
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button 
            size="lg"
            className="neon-border bg-primary/20 hover:bg-primary/30 text-primary font-bold text-lg px-8 hover-scale"
            onClick={() => setPage('download')}
          >
            <Icon name="Sparkles" size={20} className="mr-2" />
            Начать играть
          </Button>
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
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (username && password) {
      try {
        const response = await fetch('https://functions.poehali.dev/5c574d19-bd2c-4fe3-a5f9-09cf0a69c4b9', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'login', username, password })
        });
        const data = await response.json();
        
        if (data.success) {
          setUser(data.user);
          setPage('profile');
        } else {
          setError(data.error || 'Ошибка входа');
        }
      } catch (err) {
        setError('Ошибка подключения');
      }
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
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
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
          <p className="text-center text-sm text-muted-foreground">
            Забыли пароль?{' '}
            <span className="text-secondary cursor-pointer hover:underline" onClick={() => setPage('reset-password')}>
              Восстановить
            </span>
          </p>
        </div>
      </Card>
    </div>
  );
}

function ResetPasswordPage({ setPage }: { setPage: (page: Page) => void }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async () => {
    if (!email) {
      setError('Введите email');
      return;
    }

    try {
      const response = await fetch('https://functions.poehali.dev/5fa9bf0e-dc05-4976-94bf-47d57b23f9a8', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      
      if (data.success) {
        setMessage('Письмо с инструкциями отправлено на вашу почту!');
        setError('');
      } else {
        setError(data.error || 'Ошибка отправки письма');
      }
    } catch (err) {
      setError('Ошибка подключения');
    }
  };

  return (
    <div className="max-w-md mx-auto py-20">
      <Card className="neon-border bg-card/50 backdrop-blur-sm p-8">
        <h1 className="text-3xl font-black gradient-text mb-6 text-center">Восстановление пароля</h1>
        <p className="text-muted-foreground text-center mb-6">
          Введите email, указанный при регистрации
        </p>
        <div className="space-y-4">
          <div>
            <Label htmlFor="reset-email" className="text-foreground">Email</Label>
            <Input 
              id="reset-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="neon-border bg-input mt-2"
              placeholder="example@mail.com"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          {message && (
            <p className="text-green-500 text-sm text-center">{message}</p>
          )}
          <Button 
            className="w-full neon-border bg-secondary/20 hover:bg-secondary/30 text-secondary font-bold"
            onClick={handleReset}
          >
            Отправить письмо
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Вспомнили пароль?{' '}
            <span className="text-primary cursor-pointer hover:underline" onClick={() => setPage('login')}>
              Войти
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

      <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <DownloadCard 
          platform="Windows"
          icon="Monitor"
        />
        <DownloadCard 
          platform="Android"
          icon="Smartphone"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="neon-border bg-card/50 backdrop-blur-sm p-6">
          <h3 className="text-xl font-bold mb-4 text-primary">Минимальные требования</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
              <span><strong className="text-foreground">ОС:</strong> Windows 7 или новее</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
              <span><strong className="text-foreground">Процессор:</strong> 2.0 GHz+</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
              <span><strong className="text-foreground">Оперативная память:</strong> 1 GB</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
              <span><strong className="text-foreground">Видеокарта:</strong> с поддержкой DirectX 9.0c</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
              <span><strong className="text-foreground">Место на диске:</strong> 200 MB</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
              <span><strong className="text-foreground">Звук:</strong> совместимая с DirectX</span>
            </li>
          </ul>
        </Card>

        <Card className="neon-border bg-card/50 backdrop-blur-sm p-6">
          <h3 className="text-xl font-bold mb-4 text-secondary">Рекомендуемые требования</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
              <span><strong className="text-foreground">ОС:</strong> Windows 10</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
              <span><strong className="text-foreground">Процессор:</strong> 2.4 GHz+</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
              <span><strong className="text-foreground">Оперативная память:</strong> 2 GB</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
              <span><strong className="text-foreground">Видеокарта:</strong> с поддержкой DirectX 11</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
              <span><strong className="text-foreground">Место на диске:</strong> 500 MB</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
              <span><strong className="text-foreground">Звук:</strong> совместимая с DirectX</span>
            </li>
          </ul>
        </Card>
      </div>

      <Card className="neon-border bg-card/50 backdrop-blur-sm p-6 border-yellow-500/30">
        <div className="flex items-start gap-3">
          <Icon name="AlertTriangle" size={24} className="text-yellow-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="mb-2">
              <strong className="text-foreground">Внимание:</strong> Мы не несем ответственность за ваше оборудование.
            </p>
            <p>
              Ваш Microsoft Defender (антивирусная программа, встроенная в систему Windows) может жаловаться на файл. Если не хотите — можете не скачивать ;)
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

function DownloadCard({ platform, icon }: { platform: string; icon: string }) {
  const downloadUrl = platform === "Android" 
    ? "https://download.fhgdps.com/fin0gdps/GDPS%20FIN0.apk"
    : "https://download.fhgdps.com/fin0gdps/GDPS%20FIN0.zip";

  return (
    <Card className="neon-border bg-card/50 backdrop-blur-sm p-6 hover-scale text-center">
      <Icon name={icon} size={48} className="mx-auto mb-4 text-primary neon-glow" />
      <h3 className="text-xl font-bold mb-4">{platform}</h3>
      <Button 
        className="w-full neon-border bg-primary/20 hover:bg-primary/30 text-primary font-bold"
        onClick={() => window.open(downloadUrl, '_blank')}
      >
        <Icon name="Download" size={16} className="mr-2" />
        Скачать
      </Button>
    </Card>
  );
}

function MusicPage({ user }: { user: { username: string; id: number } | null }) {
  const [musicList, setMusicList] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [url, setUrl] = useState('');

  const handleUpload = async () => {
    if (!user) return;
    if (!title || !artist || !url) return;

    const response = await fetch('https://functions.poehali.dev/f1070233-9e7f-41d4-adb9-34acf46a8a45', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'upload',
        userId: user.id,
        title,
        artist,
        url
      })
    });

    if (response.ok) {
      setTitle('');
      setArtist('');
      setUrl('');
      loadMusic();
    }
  };

  const loadMusic = async () => {
    const response = await fetch('https://functions.poehali.dev/f1070233-9e7f-41d4-adb9-34acf46a8a45');
    const data = await response.json();
    if (data.music) {
      setMusicList(data.music);
    }
  };

  useEffect(() => {
    loadMusic();
  }, []);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-black gradient-text mb-4">Музыка</h1>
        <p className="text-muted-foreground">Загружайте и слушайте музыку сообщества</p>
      </div>

      {user && (
        <Card className="neon-border bg-card/50 backdrop-blur-sm p-6 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-primary mb-4">Загрузить музыку</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-foreground">Название трека</Label>
              <Input 
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="neon-border bg-input mt-2"
                placeholder="Awesome Track"
              />
            </div>
            <div>
              <Label htmlFor="artist" className="text-foreground">Исполнитель</Label>
              <Input 
                id="artist"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                className="neon-border bg-input mt-2"
                placeholder="DJ Cool"
              />
            </div>
            <div>
              <Label htmlFor="url" className="text-foreground">Ссылка на музыку</Label>
              <Input 
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="neon-border bg-input mt-2"
                placeholder="https://example.com/music.mp3"
              />
            </div>
            <Button 
              className="w-full neon-border bg-primary/20 hover:bg-primary/30 text-primary font-bold"
              onClick={handleUpload}
            >
              <Icon name="Upload" size={18} className="mr-2" />
              Загрузить
            </Button>
          </div>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {musicList.map((track, index) => (
          <Card key={index} className="neon-border bg-card/50 backdrop-blur-sm p-4 hover-scale">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center neon-glow">
                <Icon name="Music" size={24} className="text-background" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-foreground">{track.title}</h3>
                <p className="text-sm text-muted-foreground">{track.artist}</p>
                <p className="text-xs text-muted-foreground mt-1">by {track.uploader}</p>
              </div>
              <Button size="sm" className="neon-border bg-secondary/20 hover:bg-secondary/30 text-secondary">
                <Icon name="Play" size={16} />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {!user && (
        <div className="text-center py-10">
          <Icon name="Lock" size={48} className="mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Войдите, чтобы загружать музыку</p>
        </div>
      )}
    </div>
  );
}

export default Index;