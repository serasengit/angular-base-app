import { Directive, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { LocalDatePipe } from '@shared/pipes/local-date.pipe';

@Directive()
export abstract class DataSourceBase<T, K> implements OnInit, OnChanges {
    @Input() records: T[];
    @Input() selectedRecord: T;

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @Output() readonly changeRecord = new EventEmitter<K>();

    dataSource: MatTableDataSource<K>;
    readonly pageSizeOptions = [5, 15, 20];
    readonly pageSize = 15;
    readonly length = 10;
    filter: string;

    protected abstract getRow(record: T): K;
    protected abstract get displayedColumns();

    constructor(private translateService: TranslateService, readonly localDatePipe: LocalDatePipe) {}

    ngOnInit(): void {
        this.setDataSource(this.records);
        this.configDataSource();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (
            changes['records'] &&
            !changes['records'].isFirstChange() &&
            changes['records'].previousValue !== changes['records'].currentValue
        ) {
            this.setDataSource(this.records);
            this.configDataSource();
        }
    }

    setDataSource(records: T[]): void {
        this.dataSource = new MatTableDataSource(records ? records.map((record) => this.getRow(record)) : []);
    }

    configDataSource(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filter = this.filter;
    }

    applyFilter(event: Event): void {
        const filter = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filter.trim().toLowerCase();
    }
}
