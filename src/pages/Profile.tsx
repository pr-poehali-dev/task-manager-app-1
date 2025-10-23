import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: 'Александр Иванов',
    email: 'alex.ivanov@example.com',
    phone: '+7 (999) 123-45-67',
    company: 'Tech Solutions',
    position: 'Senior Developer',
    bio: 'Опытный разработчик с 5+ летним опытом в веб-разработке',
    avatar: ''
  });

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    taskReminders: true,
    weeklyReport: true,
    darkMode: false,
    compactView: false
  });

  const [stats] = useState({
    totalTasks: 42,
    completedTasks: 28,
    inProgressTasks: 10,
    overdueTasks: 4,
    completionRate: 67
  });

  const handleSaveProfile = () => {
    toast({
      title: 'Успешно',
      description: 'Профиль обновлен'
    });
  };

  const handleSaveSettings = () => {
    toast({
      title: 'Успешно',
      description: 'Настройки сохранены'
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="gap-2">
                <Icon name="ArrowLeft" size={18} />
                Назад
              </Button>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Icon name="User" size={28} className="text-primary" />
                Профиль
              </h1>
            </div>
            <nav className="flex items-center gap-4">
              <Button variant="ghost" className="gap-2">
                <Icon name="LogOut" size={18} />
                Выход
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6 bg-card border-border animate-scale-in">
              <div className="flex flex-col items-center text-center space-y-4">
                <Avatar className="h-32 w-32 border-4 border-primary/20">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback className="text-3xl bg-primary/10 text-primary">
                    {getInitials(profile.name)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="w-full">
                  <h2 className="text-2xl font-bold">{profile.name}</h2>
                  <p className="text-muted-foreground">{profile.position}</p>
                  <p className="text-sm text-muted-foreground mt-1">{profile.company}</p>
                </div>

                <Button className="w-full gap-2">
                  <Icon name="Upload" size={16} />
                  Изменить фото
                </Button>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border animate-scale-in" style={{ animationDelay: '100ms' }}>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Icon name="BarChart3" size={20} className="text-primary" />
                Статистика
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Всего задач</span>
                  <Badge variant="outline">{stats.totalTasks}</Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Завершено</span>
                  <Badge className="bg-accent/20 text-accent">{stats.completedTasks}</Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">В работе</span>
                  <Badge className="bg-primary/20 text-primary">{stats.inProgressTasks}</Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Просрочено</span>
                  <Badge className="bg-destructive/20 text-destructive">{stats.overdueStats}</Badge>
                </div>
                <Separator />
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Процент завершения</span>
                    <span className="text-sm font-bold text-primary">{stats.completionRate}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary rounded-full h-2 transition-all duration-500"
                      style={{ width: `${stats.completionRate}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="bg-card border-border animate-fade-in">
              <Tabs defaultValue="profile" className="w-full">
                <div className="border-b border-border px-6">
                  <TabsList className="bg-transparent h-auto p-0 w-full justify-start">
                    <TabsTrigger 
                      value="profile" 
                      className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3 gap-2"
                    >
                      <Icon name="User" size={16} />
                      Личные данные
                    </TabsTrigger>
                    <TabsTrigger 
                      value="settings" 
                      className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3 gap-2"
                    >
                      <Icon name="Settings" size={16} />
                      Настройки
                    </TabsTrigger>
                    <TabsTrigger 
                      value="security" 
                      className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-3 gap-2"
                    >
                      <Icon name="Shield" size={16} />
                      Безопасность
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="profile" className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Имя и фамилия *</Label>
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Телефон</Label>
                        <Input
                          id="phone"
                          value={profile.phone}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Компания</Label>
                        <Input
                          id="company"
                          value={profile.company}
                          onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="position">Должность</Label>
                      <Input
                        id="position"
                        value={profile.position}
                        onChange={(e) => setProfile({ ...profile, position: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">О себе</Label>
                      <Input
                        id="bio"
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button onClick={handleSaveProfile} className="gap-2">
                        <Icon name="Save" size={16} />
                        Сохранить изменения
                      </Button>
                      <Button variant="outline">
                        Отмена
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="p-6 space-y-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Уведомления</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Email уведомления</Label>
                            <p className="text-sm text-muted-foreground">
                              Получать уведомления на почту
                            </p>
                          </div>
                          <Switch
                            checked={settings.emailNotifications}
                            onCheckedChange={(checked) => 
                              setSettings({ ...settings, emailNotifications: checked })
                            }
                          />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Push уведомления</Label>
                            <p className="text-sm text-muted-foreground">
                              Браузерные уведомления
                            </p>
                          </div>
                          <Switch
                            checked={settings.pushNotifications}
                            onCheckedChange={(checked) => 
                              setSettings({ ...settings, pushNotifications: checked })
                            }
                          />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Напоминания о задачах</Label>
                            <p className="text-sm text-muted-foreground">
                              Уведомления о приближающихся дедлайнах
                            </p>
                          </div>
                          <Switch
                            checked={settings.taskReminders}
                            onCheckedChange={(checked) => 
                              setSettings({ ...settings, taskReminders: checked })
                            }
                          />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Еженедельный отчет</Label>
                            <p className="text-sm text-muted-foreground">
                              Статистика за неделю каждый понедельник
                            </p>
                          </div>
                          <Switch
                            checked={settings.weeklyReport}
                            onCheckedChange={(checked) => 
                              setSettings({ ...settings, weeklyReport: checked })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Интерфейс</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Темная тема</Label>
                            <p className="text-sm text-muted-foreground">
                              Использовать темное оформление
                            </p>
                          </div>
                          <Switch
                            checked={settings.darkMode}
                            onCheckedChange={(checked) => 
                              setSettings({ ...settings, darkMode: checked })
                            }
                          />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Компактный вид</Label>
                            <p className="text-sm text-muted-foreground">
                              Уменьшенные отступы в интерфейсе
                            </p>
                          </div>
                          <Switch
                            checked={settings.compactView}
                            onCheckedChange={(checked) => 
                              setSettings({ ...settings, compactView: checked })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button onClick={handleSaveSettings} className="gap-2">
                        <Icon name="Save" size={16} />
                        Сохранить настройки
                      </Button>
                      <Button variant="outline">
                        Сбросить
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="security" className="p-6 space-y-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Изменить пароль</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Текущий пароль</Label>
                          <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">Новый пароль</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Подтвердите пароль</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                        <Button className="gap-2">
                          <Icon name="Key" size={16} />
                          Изменить пароль
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Двухфакторная аутентификация</h3>
                      <div className="flex items-start gap-4 p-4 border border-border rounded-lg bg-muted/30">
                        <Icon name="ShieldCheck" size={24} className="text-primary mt-1" />
                        <div className="flex-1">
                          <p className="font-medium mb-1">2FA не активирована</p>
                          <p className="text-sm text-muted-foreground mb-3">
                            Добавьте дополнительный уровень защиты вашего аккаунта
                          </p>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Icon name="Plus" size={14} />
                            Включить 2FA
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-destructive">Опасная зона</h3>
                      <div className="border border-destructive/50 rounded-lg p-4 space-y-3">
                        <div>
                          <h4 className="font-medium mb-1">Удалить аккаунт</h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            Это действие необратимо. Все ваши данные будут удалены.
                          </p>
                          <Button variant="destructive" size="sm" className="gap-2">
                            <Icon name="Trash2" size={14} />
                            Удалить аккаунт
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
