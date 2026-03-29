import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';

// Initialize Vercel Web Analytics and Speed Insights
inject();
injectSpeedInsights();

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
