// 📁 src/app/components/screenshots/screenshots.ts - WITH IMAGE MODAL
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Screenshot {
  id: number;
  src: string;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-screenshots',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './screenshots.html',
  styleUrls: ['./screenshots.scss']
})
export class Screenshots implements OnInit {
  hoveredIndex: number | null = null;
  selectedImage: Screenshot | null = null;

  screenshots: Screenshot[] = [
    {
      id: 1,
      src: 'https://res.cloudinary.com/dms7inqwd/image/upload/v1763973645/WhatsApp_Image_2025-11-24_at_10.40.16_AM_qjtuop.jpg',
      title: 'لوحة التحكم الرئيسية',
      description: 'نظرة شاملة على أداء شركتك',
      icon: 'bi-speedometer2'
    },
    {
      id: 2,
      src: 'https://res.cloudinary.com/dms7inqwd/image/upload/v1763973792/WhatsApp_Image_2025-11-24_at_10.42.48_AM_kgslim.jpg',
      title: 'إدارة العملاء',
      description: 'قاعدة بيانات متكاملة للعملاء',
      icon: 'bi-people-fill'
    },
    {
      id: 3,
      src: 'https://res.cloudinary.com/dms7inqwd/image/upload/v1763973841/WhatsApp_Image_2025-11-24_at_10.43.44_AM_jyllxd.jpg',
      title: 'نظام الفواتير',
      description: 'إصدار وطباعة الفواتير بسهولة',
      icon: 'bi-receipt'
    },
    {
      id: 4,
      src: 'https://res.cloudinary.com/dms7inqwd/image/upload/v1763973883/image_nnkzxj.jpg',
      title: 'جدولة الصيانة',
      description: 'تنظيم مواعيد الصيانة تلقائياً',
      icon: 'bi-calendar-check'
    },
    {
      id: 5,
      src: 'https://res.cloudinary.com/dms7inqwd/image/upload/v1763973926/image_1_x0cyyy.jpg',
      title: 'إدارة المخزون',
      description: 'تتبع المنتجات والموردين',
      icon: 'bi-box-seam'
    },
    {
      id: 6,
      src: 'https://res.cloudinary.com/dms7inqwd/image/upload/v1763973960/image_2_qnuyzx.jpg',
      title: 'التقارير والإحصائيات',
      description: 'رسوم بيانية تفاعلية وتحليلات',
      icon: 'bi-graph-up-arrow'
    }
  ];

  ngOnInit(): void {
    // ✅ Parallax effect removed - images stay fixed
  }

  getAosAnimation(index: number): string {
    const animations = [
      'fade-up',
      'fade-down',
      'zoom-in',
      'flip-left',
      'flip-right',
      'fade-up'
    ];
    return animations[index % animations.length];
  }

  onImageHover(index: number): void {
    this.hoveredIndex = index;
  }

  onImageLeave(index: number): void {
    this.hoveredIndex = null;
  }

  // ✅ Open image in modal
  openImageModal(screenshot: Screenshot): void {
    this.selectedImage = screenshot;
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }

  // ✅ Close modal
  closeImageModal(): void {
    this.selectedImage = null;
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  }

  playVideo(): void {
    console.log('Play video');
    // You can implement video modal here
  }

  private initParallaxEffect(): void {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const images = document.querySelectorAll('.screenshot-image');
      
      images.forEach((img, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed / 10);
        (img as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    });
  }
}