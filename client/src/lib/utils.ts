import { type ClassValue, clsx } from 'clsx';
import Cookies from 'js-cookie';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCurrentUserId() {
  return Cookies.get('user_id');
}
export function getCurrentUserName() {
  return Cookies.get('name');
}
