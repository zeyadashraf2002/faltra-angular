// 📁 src/app/components/how-it-works/how-it-works.ts - WITH AUTO-PLAY VIDEO
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { SafePipe } from '../../pipes/safe.pipe';
interface Step {
  id: number;
  number: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  action?: string;
  actionLabel?: string;
}

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule, SafePipe],
  templateUrl: './how-it-works.html',
  styleUrls: ['./how-it-works.scss']
})
export class HowItWorks implements OnInit, OnDestroy {
  
  @ViewChild('videoPlayer', { static: false }) videoPlayer?: ElementRef<HTMLVideoElement>;
  
  private observer?: IntersectionObserver;
  videoUrl = 'https://player.cloudinary.com/embed/?cloud_name=dbgthgcgh&public_id=copy_F346FD57-12C9-4474-9A95-80F5621A0990_xz15py&profile=cld-default';
  localVideoUrl = 'assets/videos/tutorial.mp4'; // Local fallback
  useYouTube = true;
  showVideo = false;
  isVideoPlaying = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.setupVideoObserver();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  steps: Step[] = [
    {
      id: 1,
      number: '01',
      icon: 'bi-person-plus',
      title: 'أنشئ حسابك مجاناً',
      description: 'سجل بياناتك الأساسية واحصل على حساب مجاني لمدة 14 يوم',
      features: [
        'تسجيل سريع في أقل من دقيقة',
        'لا حاجة لبطاقة ائتمان',
        'وصول فوري لجميع المميزات'
      ],
      action: 'signup',
      actionLabel: 'ابدأ التسجيل الآن'
    },
    {
      id: 2,
      number: '02',
      icon: 'bi-gear',
      title: 'أضف بياناتك وخصص النظام',
      description: 'أضف بيانات شركتك، العملاء، المنتجات، والموظفين بسهولة',
      features: [
        'استيراد البيانات من Excel',
        'إضافة الشعار والألوان',
        'تخصيص الفواتير والتقارير'
      ]
    },
    {
      id: 3,
      number: '03',
      icon: 'bi-rocket-takeoff',
      title: 'ابدأ إدارة شركتك بكفاءة',
      description: 'استخدم جميع أدوات النظام لإدارة شركتك بسهولة واحترافية',
      features: [
        'إصدار الفواتير في ثوانٍ',
        'جدولة الصيانة تلقائياً',
        'تتبع المخزون والمبيعات',
        'تقارير تفصيلية لحظية'
      ],
      action: 'signup',
      actionLabel: 'ابدأ تجربتك المجانية'
      
    }
  ];

  /**
   * Setup Intersection Observer to detect when video enters/exits viewport
   */
  private setupVideoObserver() {
    // Wait for DOM to be ready
    setTimeout(() => {
      const videoSection = document.querySelector('.video-demo');
      
      if (!videoSection) return;

      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% of video is visible
      };

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Video entered viewport - play it
            this.playVideo();
          } else {
            // Video left viewport - pause it
            this.pauseVideo();
          }
        });
      }, options);

      this.observer.observe(videoSection);
    }, 500);
  }

  /**
   * Play video when it enters viewport
   */
  playVideo(): void {
    if (this.isVideoPlaying) return;

    this.showVideo = true;
    this.isVideoPlaying = true;

    // If using local video
    if (!this.useYouTube) {
      setTimeout(() => {
        if (this.videoPlayer?.nativeElement) {
          this.videoPlayer.nativeElement.play().catch(error => {
            console.warn('Video autoplay prevented:', error);
          });
        }
      }, 100);
    }
  }

  /**
   * Pause video when it leaves viewport
   */
  pauseVideo(): void {
    if (!this.isVideoPlaying) return;

    this.isVideoPlaying = false;

    // If using local video
    if (!this.useYouTube && this.videoPlayer?.nativeElement) {
      this.videoPlayer.nativeElement.pause();
    } else if (this.useYouTube) {
      // Reload iframe to stop YouTube video
      this.showVideo = false;
      setTimeout(() => {
        this.showVideo = false;
      }, 50);
    }
  }

  /**
   * Manual play button click
   */
  onManualPlay(): void {
    this.showVideo = true;
    this.isVideoPlaying = true;
    
    if (!this.useYouTube && this.videoPlayer?.nativeElement) {
      this.videoPlayer.nativeElement.play();
    }
  }

  /**
   * Handle video source change (YouTube/Local)
   */
  toggleVideoSource(): void {
    this.useYouTube = !this.useYouTube;
    this.showVideo = false;
    this.isVideoPlaying = false;
  }

  handleAction(action: string): void {
    if (action === 'signup') {
      this.startTrial();
    } else if (action === 'demo') {
      this.scheduleDemo();
    }
  }

  startTrial(): void {
    window.location.href = `${environment.APP_URL}/signup`;
  }

  scheduleDemo(): void {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}