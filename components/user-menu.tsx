'use client'

import {LogOut, User, Plus} from 'lucide-react'
import {useAuthStore} from '@/stores/userStore'
import {Button} from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {Avatar, AvatarFallback} from '@/components/ui/avatar'
import {useRouter} from 'next/navigation';

export function UserMenu() {
  const router = useRouter();
  const {user, resetAuth} = useAuthStore()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem onClick={() => router.push('/profile')} className="flex items-center">
          <User className="mr-2 h-4 w-4"/>
          <span>{user?.name || 'User'}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/create')} className="flex items-center">
          <Plus className="mr-2 h-4 w-4"/>
          <span>Додати новий товар</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator/>
        <DropdownMenuItem className="flex items-center cursor-pointer" onSelect={() => resetAuth()}>
          <LogOut className="mr-2 h-4 w-4"/>
          <span>Вийти</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
