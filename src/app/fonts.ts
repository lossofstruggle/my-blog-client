// app/fonts.ts
import { Zhi_Mang_Xing } from '@next/font/google';

export const zhiMangXing = Zhi_Mang_Xing({
  weight: '400', // 该字体只有 400 字重
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-zhi-mang-xing',
});