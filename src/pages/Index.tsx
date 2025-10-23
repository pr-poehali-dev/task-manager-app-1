import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

type TaskStatus = 'pending' | 'in-progress' | 'done';

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
  isImportant: boolean;
  createdAt: string;
}

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Разработать дизайн главной страницы',
      description: 'Создать макет в Figma с учетом фирменного стиля',
      dueDate: '2025-10-25',
      status: 'in-progress',
      isImportant: true,
      createdAt: '2025-10-20'
    },
    {
      id: 2,
      title: 'Настроить CI/CD pipeline',
      description: 'Автоматизация деплоя на production сервер',
      dueDate: '2025-10-28',
      status: 'pending',
      isImportant: true,
      createdAt: '2025-10-21'
    },
    {
      id: 3,
      title: 'Написать документацию API',
      description: '',
      dueDate: '',
      status: 'pending',
      isImportant: false,
      createdAt: '2025-10-22'
    },
    {
      id: 4,
      title: 'Провести код-ревью',
      description: 'Проверить pull request от команды',
      dueDate: '2025-10-24',
      status: 'done',
      isImportant: false,
      createdAt: '2025-10-19'
    }
  ]);

  const [currentTab, setCurrentTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [showImportantOnly, setShowImportantOnly] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTaskId, setDeletingTaskId] = useState<number | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [viewingTask, setViewingTask] = useState<Task | null>(null);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'pending' as TaskStatus,
    isImportant: false
  });

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-muted text-muted-foreground';
      case 'in-progress':
        return 'bg-primary/20 text-primary';
      case 'done':
        return 'bg-accent/20 text-accent';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusLabel = (status: TaskStatus) => {
    switch (status) {
      case 'pending':
        return 'Ожидает';
      case 'in-progress':
        return 'В работе';
      case 'done':
        return 'Завершено';
      default:
        return status;
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesImportant = !showImportantOnly || task.isImportant;
    const matchesTab = currentTab === 'all' || (currentTab === 'important' && task.isImportant);
    
    return matchesSearch && matchesStatus && matchesImportant && matchesTab;
  });

  const handleCreateTask = () => {
    if (!newTask.title.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Заголовок задачи обязателен',
        variant: 'destructive'
      });
      return;
    }

    const task: Task = {
      id: Date.now(),
      title: newTask.title,
      description: newTask.description,
      dueDate: newTask.dueDate,
      status: newTask.status,
      isImportant: newTask.isImportant,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setTasks([task, ...tasks]);
    setNewTask({
      title: '',
      description: '',
      dueDate: '',
      status: 'pending',
      isImportant: false
    });
    setIsCreateDialogOpen(false);
    toast({
      title: 'Успешно',
      description: 'Задача создана'
    });
  };

  const handleEditTask = () => {
    if (!editingTask || !editingTask.title.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Заголовок задачи обязателен',
        variant: 'destructive'
      });
      return;
    }

    setTasks(tasks.map(t => t.id === editingTask.id ? editingTask : t));
    setEditingTask(null);
    setIsEditDialogOpen(false);
    toast({
      title: 'Успешно',
      description: 'Задача обновлена'
    });
  };

  const handleDeleteTask = () => {
    if (deletingTaskId) {
      setTasks(tasks.filter(t => t.id !== deletingTaskId));
      setDeletingTaskId(null);
      toast({
        title: 'Успешно',
        description: 'Задача удалена'
      });
    }
  };

  const toggleImportant = (taskId: number) => {
    setTasks(tasks.map(t => 
      t.id === taskId ? { ...t, isImportant: !t.isImportant } : t
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Icon name="CheckSquare" size={28} className="text-primary" />
              Task Manager
            </h1>
            <nav className="flex items-center gap-4">
              <Button variant="ghost" className="gap-2" onClick={() => navigate('/profile')}>
                <Icon name="User" size={18} />
                Профиль
              </Button>
              <Button variant="ghost" className="gap-2">
                <Icon name="LogOut" size={18} />
                Выход
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <TabsList className="bg-card border border-border">
              <TabsTrigger value="all" className="gap-2">
                <Icon name="List" size={16} />
                Все задачи
              </TabsTrigger>
              <TabsTrigger value="create" className="gap-2">
                <Icon name="Plus" size={16} />
                Создать
              </TabsTrigger>
              <TabsTrigger value="important" className="gap-2">
                <Icon name="Star" size={16} />
                Важные
              </TabsTrigger>
            </TabsList>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-1 sm:min-w-[300px]">
                <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск по заголовку..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as TaskStatus | 'all')}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все статусы</SelectItem>
                  <SelectItem value="pending">Ожидает</SelectItem>
                  <SelectItem value="in-progress">В работе</SelectItem>
                  <SelectItem value="done">Завершено</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="all" className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTasks.map((task, index) => (
                <Card 
                  key={task.id} 
                  className="p-5 hover:shadow-lg transition-all duration-200 border-border bg-card animate-scale-in hover:border-primary/50"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-lg leading-tight flex-1">{task.title}</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-transparent"
                        onClick={() => toggleImportant(task.id)}
                      >
                        <Icon 
                          name="Star" 
                          size={18} 
                          className={task.isImportant ? 'fill-amber-500 text-amber-500' : 'text-muted-foreground'} 
                        />
                      </Button>
                    </div>

                    {task.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
                    )}

                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className={getStatusColor(task.status)}>
                        {getStatusLabel(task.status)}
                      </Badge>
                      {task.dueDate && (
                        <Badge variant="outline" className="gap-1">
                          <Icon name="Calendar" size={12} />
                          {new Date(task.dueDate).toLocaleDateString('ru-RU')}
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-1"
                        onClick={() => setViewingTask(task)}
                      >
                        <Icon name="Eye" size={14} />
                        Просмотр
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-1"
                        onClick={() => {
                          setEditingTask(task);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Icon name="Edit" size={14} />
                        Изменить
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 hover:bg-destructive/10 hover:text-destructive hover:border-destructive"
                        onClick={() => setDeletingTaskId(task.id)}
                      >
                        <Icon name="Trash2" size={14} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredTasks.length === 0 && (
              <div className="text-center py-16 animate-fade-in">
                <Icon name="Inbox" size={64} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Задачи не найдены</h3>
                <p className="text-muted-foreground">Попробуйте изменить фильтры или создать новую задачу</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="create" className="animate-fade-in">
            <Card className="max-w-2xl mx-auto p-6 bg-card border-border">
              <h2 className="text-2xl font-bold mb-6">Создать новую задачу</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Заголовок *</Label>
                  <Input
                    id="title"
                    placeholder="Введите заголовок задачи"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Описание</Label>
                  <Textarea
                    id="description"
                    placeholder="Опишите задачу подробнее"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Срок выполнения</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Статус</Label>
                    <Select value={newTask.status} onValueChange={(v) => setNewTask({ ...newTask, status: v as TaskStatus })}>
                      <SelectTrigger id="status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Ожидает</SelectItem>
                        <SelectItem value="in-progress">В работе</SelectItem>
                        <SelectItem value="done">Завершено</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="important"
                    checked={newTask.isImportant}
                    onChange={(e) => setNewTask({ ...newTask, isImportant: e.target.checked })}
                    className="h-4 w-4 rounded border-border"
                  />
                  <Label htmlFor="important" className="cursor-pointer">Пометить как важную</Label>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={handleCreateTask} className="flex-1 gap-2">
                    <Icon name="Plus" size={18} />
                    Создать задачу
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setNewTask({
                      title: '',
                      description: '',
                      dueDate: '',
                      status: 'pending',
                      isImportant: false
                    })}
                  >
                    Очистить
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="important" className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTasks.filter(t => t.isImportant).map((task, index) => (
                <Card 
                  key={task.id} 
                  className="p-5 hover:shadow-lg transition-all duration-200 border-border bg-card animate-scale-in hover:border-primary/50"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-lg leading-tight flex-1">{task.title}</h3>
                      <Icon name="Star" size={18} className="fill-amber-500 text-amber-500" />
                    </div>

                    {task.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
                    )}

                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className={getStatusColor(task.status)}>
                        {getStatusLabel(task.status)}
                      </Badge>
                      {task.dueDate && (
                        <Badge variant="outline" className="gap-1">
                          <Icon name="Calendar" size={12} />
                          {new Date(task.dueDate).toLocaleDateString('ru-RU')}
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-1"
                        onClick={() => setViewingTask(task)}
                      >
                        <Icon name="Eye" size={14} />
                        Просмотр
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-1"
                        onClick={() => {
                          setEditingTask(task);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Icon name="Edit" size={14} />
                        Изменить
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 hover:bg-destructive/10 hover:text-destructive hover:border-destructive"
                        onClick={() => setDeletingTaskId(task.id)}
                      >
                        <Icon name="Trash2" size={14} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredTasks.filter(t => t.isImportant).length === 0 && (
              <div className="text-center py-16 animate-fade-in">
                <Icon name="Star" size={64} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Нет важных задач</h3>
                <p className="text-muted-foreground">Отметьте задачи звездочкой, чтобы они появились здесь</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={viewingTask !== null} onOpenChange={(open) => !open && setViewingTask(null)}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              {viewingTask?.title}
              {viewingTask?.isImportant && (
                <Icon name="Star" size={20} className="fill-amber-500 text-amber-500" />
              )}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            {viewingTask?.description && (
              <div>
                <Label className="text-muted-foreground">Описание</Label>
                <p className="mt-1">{viewingTask.description}</p>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground">Статус</Label>
                <Badge className={`${getStatusColor(viewingTask?.status || 'pending')} mt-1`}>
                  {getStatusLabel(viewingTask?.status || 'pending')}
                </Badge>
              </div>
              {viewingTask?.dueDate && (
                <div>
                  <Label className="text-muted-foreground">Срок выполнения</Label>
                  <p className="mt-1">{new Date(viewingTask.dueDate).toLocaleDateString('ru-RU')}</p>
                </div>
              )}
            </div>

            <div>
              <Label className="text-muted-foreground">Дата создания</Label>
              <p className="mt-1">{viewingTask?.createdAt && new Date(viewingTask.createdAt).toLocaleDateString('ru-RU')}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-card border-border max-w-2xl">
          <DialogHeader>
            <DialogTitle>Редактировать задачу</DialogTitle>
          </DialogHeader>
          {editingTask && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Заголовок *</Label>
                <Input
                  id="edit-title"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">Описание</Label>
                <Textarea
                  id="edit-description"
                  value={editingTask.description}
                  onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-dueDate">Срок выполнения</Label>
                  <Input
                    id="edit-dueDate"
                    type="date"
                    value={editingTask.dueDate}
                    onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-status">Статус</Label>
                  <Select value={editingTask.status} onValueChange={(v) => setEditingTask({ ...editingTask, status: v as TaskStatus })}>
                    <SelectTrigger id="edit-status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Ожидает</SelectItem>
                      <SelectItem value="in-progress">В работе</SelectItem>
                      <SelectItem value="done">Завершено</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="edit-important"
                  checked={editingTask.isImportant}
                  onChange={(e) => setEditingTask({ ...editingTask, isImportant: e.target.checked })}
                  className="h-4 w-4 rounded border-border"
                />
                <Label htmlFor="edit-important" className="cursor-pointer">Пометить как важную</Label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleEditTask} className="flex-1">
                  Сохранить
                </Button>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Отмена
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={deletingTaskId !== null} onOpenChange={(open) => !open && setDeletingTaskId(null)}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить задачу?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Задача будет удалена навсегда.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteTask} className="bg-destructive hover:bg-destructive/90">
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;