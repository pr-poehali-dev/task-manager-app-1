import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
    avatar: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    if (!profile.name || !profile.email) {
      toast({
        title: 'Ошибка',
        description: 'Имя и email обязательны',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Успешно',
      description: 'Профиль обновлен'
    });
    setIsEditing(false);
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
              <Button variant="ghost" className="gap-2" onClick={() => navigate('/login')}>
                <Icon name="LogOut" size={18} />
                Выход
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="p-8 bg-card border-border animate-scale-in">
          <div className="flex flex-col items-center text-center mb-8">
            <Avatar className="h-32 w-32 border-4 border-primary/20 mb-4">
              <AvatarImage src={profile.avatar} />
              <AvatarFallback className="text-3xl bg-primary/10 text-primary">
                {getInitials(profile.name)}
              </AvatarFallback>
            </Avatar>
            
            <h2 className="text-2xl font-bold mb-1">{profile.name}</h2>
            <p className="text-muted-foreground">{profile.email}</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Личные данные</h3>
              {!isEditing ? (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="gap-2">
                  <Icon name="Edit" size={16} />
                  Редактировать
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                    Отмена
                  </Button>
                  <Button size="sm" onClick={handleSave} className="gap-2">
                    <Icon name="Save" size={16} />
                    Сохранить
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Имя и фамилия *</Label>
                <div className="relative">
                  <Icon name="User" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <div className="relative">
                  <Icon name="Mail" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <div className="relative">
                  <Icon name="Phone" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Profile;
