"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import styles from './MoreDropdown.module.css';

export function MoreDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button 
        className={styles.dropdownBtn} 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        More <ChevronDown size={16} className={styles.icon} />
      </button>
      
      {isOpen && (
        <div className={styles.menu}>
          <div className={styles.menuSection}>
            <span className={styles.sectionTitle}>MORE</span>
            <Link href="/copy-text-from-image" className={styles.menuItem} onClick={() => setIsOpen(false)}>
              <div className={styles.itemHeader}>Copy Text from Image &rarr;</div>
              <div className={styles.itemDesc}>Long-press or drag the text in an image to copy it — click to edit.</div>
            </Link>
            
            <Link href="/photo-scanner" className={styles.simpleMenuItem} onClick={() => setIsOpen(false)}>
              Photo Scanner <span className={styles.arrow}>&rarr;</span>
            </Link>
            <Link href="/resize-image" className={styles.simpleMenuItem} onClick={() => setIsOpen(false)}>
              Resize Image <span className={styles.arrow}>&rarr;</span>
            </Link>
            <Link href="/image-to-pdf" className={styles.simpleMenuItem} onClick={() => setIsOpen(false)}>
              Image to PDF <span className={styles.arrow}>&rarr;</span>
            </Link>
            <Link href="/pdf-to-images" className={styles.simpleMenuItem} onClick={() => setIsOpen(false)}>
              PDF to Images <span className={styles.arrow}>&rarr;</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
