import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    declarations: [NewsComponent],
    exports: [NewsComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        MatCardModule,
        MatButtonModule,
        ScrollingModule,
        MatProgressSpinnerModule,
    ],
})
export class NewsModule {}
