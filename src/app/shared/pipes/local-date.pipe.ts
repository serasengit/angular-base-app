import { formatDate } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { Language } from '@app/app.component';
import { AppState } from '@app/store/reducers/app.reducers';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

export enum DateFormat {
    Short = 'short', // 'M/d/yy, h:mm a' (6/15/15, 9:03 AM).
    Medium = 'medium', // 'MMM d, y, h:mm:ss a' (Jun 15, 2015, 9:03:01 AM).
    Long = 'long', // 'MMMM d, y, h:mm:ss a z' (June 15, 2015 at 9:03:01 AM GMT+1).
    Full = 'full', // 'EEEE, MMMM d, y, h:mm:ss a zzzz' (Monday, June 15, 2015 at 9:03:01 AM GMT+01:00).
    ShortDate = 'shortDate', // 'M/d/yy' (6/15/15).
    MediumDate = 'mediumDate', // 'MMM d, y' (Jun 15, 2015).
    LongDate = 'longDate', // 'MMMM d, y' (June 15, 2015).
    FullDate = 'fullDate', // 'EEEE, MMMM d, y' (Monday, June 15, 2015).
    ShortTime = 'shortTime', // 'h:mm a' (9:03 AM).
    MediumTime = 'mediumTime', // 'h:mm:ss a' (9:03:01 AM).
    LongTime = 'longTime', // 'h:mm:ss a z' (9:03:01 AM GMT+1).
    FullTime = 'fullTime', // 'h:mm:ss a zzzz' (9:03:01 AM GMT+01:00).
}
export enum CustomDateFormat {
    FullShortDateTime = 'fullShortDateTime', // 'MM/dd/YY HH:mm:ss (02/17/22 14:05:15).
    FullShortDateMinutes = 'fullShortDateMinutes', // 'MM/DD/YY HH:mm' (02/17/22 14:05).
    ShortDate = 'shortDate', // 'DD/MM/YY' (02/17/22)
}
@Pipe({
    name: 'localDate',
})
export class LocalDatePipe implements PipeTransform {
    private readonly internationalizedCustomDateFormats: {
        [key in CustomDateFormat]: { [key in Language]: string };
    } = {
        [CustomDateFormat.FullShortDateTime]: {
            [Language.English]: 'MM/dd/YY HH:mm:ss',
            [Language.Spanish]: 'dd/MM/YY HH:mm:ss',
        },
        [CustomDateFormat.FullShortDateMinutes]: {
            [Language.English]: 'MM/DD/YY HH:mm',
            [Language.Spanish]: 'DD/MM/YY HH:mm',
        },
        [CustomDateFormat.ShortDate]: {
            [Language.English]: 'MM/dd/YY',
            [Language.Spanish]: 'dd/MM/YY',
        },
    };
    constructor(
        @Inject(LOCALE_ID) private readonly locale: string,
        private readonly appStore: Store<AppState>,
        private readonly translate: TranslateService
    ) {}

    public transform(value: Date, format: DateFormat | CustomDateFormat): string {
        return value && value.toString() !== 'Invalid Date'
            ? formatDate(value, this.getInternationalizedDateFormat(format), <Language>this.translate.currentLang ?? Language.English)
            : '-';
    }

    public getInternationalizedDateFormat(format: DateFormat | CustomDateFormat): string {
        return Object.values(DateFormat).includes(<DateFormat>format)
            ? format
            : this.internationalizedCustomDateFormats[<CustomDateFormat>format][<Language>this.translate.currentLang ?? Language.English];
    }
}
