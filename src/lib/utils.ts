import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Intelligently abbreviates department names for mobile display
 * Examples:
 * - "Computer Science and Engineering" -> "CSE"
 * - "Mechanical and Industrial Engineering" -> "MIE"
 * - "Mathematics" -> "Math"
 */
export function abbreviateDepartment(department: string): string {
  if (!department) return '';

  // Common abbreviations map
  const commonAbbreviations: Record<string, string> = {
    'Computer Science and Engineering': 'CSE',
    'Electronics and Communication Engineering': 'ECE',
    'Electrical and Electronics Engineering': 'EEE',
    'Mechanical and Industrial Engineering': 'MIE',
    'Mechanical Engineering': 'ME',
    'Civil Engineering': 'CE',
    'Chemical Engineering': 'ChE',
    'Biotechnology': 'BT',
    'Information Technology': 'IT',
    'Aeronautical Engineering': 'AE',
    'Automobile Engineering': 'Auto',
    'Biomedical Engineering': 'BME',
    'Industrial and Production Engineering': 'IPE',
    'Instrumentation and Control Engineering': 'ICE',
    'Mathematics': 'Math',
    'Physics': 'Phy',
    'Chemistry': 'Chem',
    'Humanities': 'Hum',
    'Management': 'Mgmt',
    'Sciences': 'Sci',
  };

  // Check if we have a direct match
  if (commonAbbreviations[department]) {
    return commonAbbreviations[department];
  }

  // If not, create abbreviation from capital letters or first letters of words
  const words = department.split(' ').filter(w => w.length > 0);

  // If single word, take first 3-4 characters
  if (words.length === 1) {
    return department.length > 4 ? department.substring(0, 4) : department;
  }

  // Multi-word: take first letter of each significant word (skip 'and', 'of', 'the')
  const skipWords = new Set(['and', 'of', 'the', 'in', 'for']);
  const abbreviation = words
    .filter(word => !skipWords.has(word.toLowerCase()))
    .map(word => word[0].toUpperCase())
    .join('');

  return abbreviation || department.substring(0, 3);
}

