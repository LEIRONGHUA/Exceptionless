import type { PersistentEventKnownTypes } from '$lib/models/api';
import type { StackStatus } from '$lib/models/api';
import type { Serializer } from 'svelte-persisted-store';
import { get, type Writable } from 'svelte/store';

export interface IFilter {
    readonly type: string;
    readonly key: string;
    isEmpty(): boolean;
    reset(): void;
    toFilter(): string;
}

export class BooleanFilter implements IFilter {
    constructor(
        public term?: string,
        public value?: boolean
    ) {}

    public type: string = 'boolean';

    public get key(): string {
        return `${this.type}:${this.term}`;
    }

    public isEmpty(): boolean {
        return this.value === undefined;
    }

    public reset(): void {
        this.value = undefined;
    }

    public toFilter(): string {
        if (this.term === undefined) {
            return '';
        }

        if (this.value === undefined) {
            return `_missing_:${this.term}`;
        }

        return `${this.term}:${this.value}`;
    }
}

export class DateFilter implements IFilter {
    constructor(
        public term?: string,
        public value?: Date | string
    ) {}

    public type: string = 'date';

    public get key(): string {
        return `${this.type}:${this.term}`;
    }

    public isEmpty(): boolean {
        return this.value === undefined;
    }

    public reset(): void {
        this.value = undefined;
    }

    public toFilter(): string {
        if (this.term === undefined) {
            return '';
        }

        if (this.value === undefined) {
            return `_missing_:${this.term}`;
        }

        const date = this.value instanceof Date ? this.value.toISOString() : this.value;
        return `${this.term}:${quoteIfSpecialCharacters(date)}`;
    }
}

export class KeywordFilter implements IFilter {
    constructor(public value?: string) {}

    public type: string = 'keyword';

    public get key(): string {
        return this.type;
    }

    public isEmpty(): boolean {
        return !this.value?.trim();
    }

    public reset(): void {
        this.value = undefined;
    }

    public toFilter(): string {
        if (this.isEmpty()) {
            return '';
        }

        return this.value!.trim();
    }
}

export class NumberFilter implements IFilter {
    constructor(
        public term?: string,
        public value?: number
    ) {}

    public type: string = 'number';

    public get key(): string {
        return `${this.type}:${this.term}`;
    }

    public isEmpty(): boolean {
        return this.value === undefined;
    }

    public reset(): void {
        this.value = undefined;
    }

    public toFilter(): string {
        if (this.term === undefined) {
            return '';
        }

        if (this.value === undefined) {
            return `_missing_:${this.term}`;
        }

        return `${this.term}:${this.value}`;
    }
}

export class OrganizationFilter implements IFilter {
    constructor(public value?: string) {}

    public type: string = 'organization';

    public get key(): string {
        return this.type;
    }

    public isEmpty(): boolean {
        return !this.value?.trim();
    }

    public reset(): void {
        this.value = undefined;
    }

    public toFilter(): string {
        if (this.isEmpty()) {
            return '';
        }

        return `organization:${this.value}`;
    }
}

export class ProjectFilter implements IFilter {
    constructor(
        public organization: string | undefined,
        public value: string[]
    ) {}

    public type: string = 'project';

    public get key(): string {
        return this.type;
    }

    public isEmpty(): boolean {
        return this.value.length === 0;
    }

    public reset(): void {
        this.value = [];
    }

    public toFilter(): string {
        if (this.value.length == 0) {
            return '';
        }

        if (this.value.length == 1) {
            return `project:${this.value[0]}`;
        }

        return `(${this.value.map((val) => `project:${val}`).join(' OR ')})`;
    }
}

export class ReferenceFilter implements IFilter {
    constructor(public value?: string) {}

    public type: string = 'reference';

    public get key(): string {
        return this.type;
    }

    public isEmpty(): boolean {
        return !this.value?.trim();
    }

    public reset(): void {
        this.value = undefined;
    }

    public toFilter(): string {
        if (this.isEmpty()) {
            return '';
        }

        return `reference:${quoteIfSpecialCharacters(this.value)}`;
    }
}

export class SessionFilter implements IFilter {
    constructor(public value?: string) {}

    public type: string = 'session';

    public get key(): string {
        return this.type;
    }

    public isEmpty(): boolean {
        return !this.value?.trim();
    }

    public reset(): void {
        this.value = undefined;
    }

    public toFilter(): string {
        if (this.isEmpty()) {
            return '';
        }

        const session = quoteIfSpecialCharacters(this.value);
        return `(reference:${session} OR ref.session:${session})`;
    }
}

export class StatusFilter implements IFilter {
    constructor(public value: StackStatus[]) {}

    public type: string = 'status';

    public get key(): string {
        return this.type;
    }

    public isEmpty(): boolean {
        return this.value.length === 0;
    }

    public reset(): void {
        this.value = [];
    }

    public toFilter(): string {
        if (this.value.length == 0) {
            return '';
        }

        if (this.value.length == 1) {
            return `status:${this.value[0]}`;
        }

        return `(${this.value.map((val) => `status:${val}`).join(' OR ')})`;
    }
}

export class StringFilter implements IFilter {
    constructor(
        public term?: string,
        public value?: string
    ) {}

    public type: string = 'string';

    public get key(): string {
        return `${this.type}:${this.term}`;
    }

    public isEmpty(): boolean {
        return this.value === undefined;
    }

    public reset(): void {
        this.value = undefined;
    }

    public toFilter(): string {
        if (this.term === undefined) {
            return '';
        }

        if (this.value === undefined) {
            return `_missing_:${this.term}`;
        }

        return `${this.term}:${quoteIfSpecialCharacters(this.value)}`;
    }
}

export class TypeFilter implements IFilter {
    constructor(public value: PersistentEventKnownTypes[]) {}

    public type: string = 'type';

    public get key(): string {
        return this.type;
    }

    public isEmpty(): boolean {
        return this.value.length === 0;
    }

    public reset(): void {
        this.value = [];
    }

    public toFilter(): string {
        if (this.value.length == 0) {
            return '';
        }

        if (this.value.length == 1) {
            return `type:${this.value[0]}`;
        }

        return `(${this.value.map((val) => `type:${val}`).join(' OR ')})`;
    }
}

export class VersionFilter implements IFilter {
    constructor(
        public term?: string,
        public value?: string
    ) {}

    public type: string = 'version';

    public get key(): string {
        return `${this.type}:${this.term}`;
    }

    public isEmpty(): boolean {
        return this.value === undefined;
    }

    public reset(): void {
        this.value = undefined;
    }

    public toFilter(): string {
        if (this.term === undefined) {
            return '';
        }

        if (this.value === undefined) {
            return `_missing_:${this.term}`;
        }

        return `${this.term}:${quoteIfSpecialCharacters(this.value)}`;
    }
}

export function quoteIfSpecialCharacters(value?: string | null): string | null | undefined {
    // Check for lucene special characters or whitespace
    const regex = new RegExp('\\+|\\-|\\&|\\||\\!|\\(|\\)|\\{|\\}|\\[|\\]|\\^|\\"|\\~|\\*|\\?|\\:|\\\\|\\/|\\s', 'g');

    if (value && value.match(regex)) {
        return quote(value);
    }

    return value;
}

export function quote(value?: string | null): string | undefined {
    return value ? `"${value}"` : undefined;
}

export function toFilter(filters: IFilter[]): string {
    return filters
        .map((f) => f.toFilter())
        .filter(Boolean)
        .join(' ')
        .trim();
}

export function getFilter(filter: Omit<IFilter, 'isEmpty' | 'reset' | 'toFilter'> & Record<string, unknown>): IFilter | undefined {
    switch (filter.type) {
        case 'boolean':
            return new BooleanFilter(filter.term as string, filter.value as boolean);
        case 'date':
            return new DateFilter(filter.term as string, filter.value as Date);
        case 'keyword':
            return new KeywordFilter(filter.value as string);
        case 'number':
            return new NumberFilter(filter.term as string, filter.value as number);
        case 'organization':
            return new OrganizationFilter(filter.value as string);
        case 'project':
            return new ProjectFilter(filter.organization as string, filter.value as string[]);
        case 'reference':
            return new ReferenceFilter(filter.value as string);
        case 'session':
            return new SessionFilter(filter.value as string);
        case 'status':
            return new StatusFilter(filter.value as StackStatus[]);
        case 'string':
            return new StringFilter(filter.term as string, filter.value as string);
        case 'type':
            return new TypeFilter(filter.value as PersistentEventKnownTypes[]);
        case 'version':
            return new VersionFilter(filter.term as string, filter.value as string);
        default:
            throw new Error(`Unknown filter type: ${filter.type}`);
    }
}

export function setFilter(filters: IFilter[], filter: IFilter): IFilter[] {
    const existingFilter = filters.find((f) => f.key === filter.key && ('term' in f && 'term' in filter ? f.term === filter.term : true));
    if (existingFilter) {
        if ('value' in existingFilter && 'value' in filter) {
            if (Array.isArray(existingFilter.value) && Array.isArray(filter.value)) {
                existingFilter.value = [...new Set([...existingFilter.value, ...filter.value])];
            } else {
                existingFilter.value = filter.value;
            }
        } else {
            Object.assign(existingFilter, filter);
        }
    } else {
        filters.push(filter);
    }

    return filters;
}

export class FilterSerializer implements Serializer<IFilter[]> {
    public parse(text: string): IFilter[] {
        if (!text) {
            return [];
        }

        const data: unknown[] = JSON.parse(text);
        const filters: IFilter[] = [];
        for (const filterData of data) {
            const filter = getFilter(filterData as Omit<IFilter, 'isEmpty' | 'reset' | 'toFilter'>);
            if (filter) {
                filters.push(filter);
            }
        }

        return filters;
    }

    public stringify(object: IFilter[]): string {
        return JSON.stringify(object);
    }
}

export function getDefaultFilters(includeDateFilter = true): IFilter[] {
    return [
        new OrganizationFilter(),
        new ProjectFilter(undefined, []),
        new StatusFilter([]),
        new TypeFilter([]),
        new DateFilter('date', 'last week'),
        new ReferenceFilter(),
        new SessionFilter(),
        new KeywordFilter()
    ].filter((f) => includeDateFilter || f.type !== 'date');
}

export function filterChanged(filters: Writable<IFilter[]>, updated: IFilter): void {
    filters.set(processFilterRules(setFilter(get(filters), updated), updated));
}

export function filterRemoved(filters: Writable<IFilter[]>, defaultFilters: IFilter[], removed?: IFilter): void {
    // If detail is undefined, remove all filters.
    if (!removed) {
        filters.set(defaultFilters);
    } else if (defaultFilters.find((f) => f.key === removed.key)) {
        filters.set(processFilterRules(setFilter(get(filters), removed), removed));
    } else {
        filters.set(
            processFilterRules(
                get(filters).filter((f) => f.key !== removed.key),
                removed
            )
        );
    }
}

export function processFilterRules(filters: IFilter[], changed?: IFilter): IFilter[] {
    // Allow only one filter per type and term.
    const groupedFilters: Partial<Record<string, IFilter[]>> = Object.groupBy(filters, (f: IFilter) => f.key);
    const filtered: IFilter[] = [];
    Object.entries(groupedFilters).forEach(([, items]) => {
        if (items && items.length > 0) {
            filtered.push(items[0]);
        }
    });

    const projectFilter = filtered.find((f) => f.type === 'project') as ProjectFilter;
    if (projectFilter) {
        let organizationFilter = filtered.find((f) => f.type === 'organization') as OrganizationFilter;

        // If there is a project filter, verify the organization filter is set
        if (!organizationFilter) {
            organizationFilter = new OrganizationFilter(projectFilter.organization);
            filtered.push(organizationFilter);
        }

        // If the organization filter changes and organization is not set on the project filter, clear the project filter
        if (changed?.type === 'organization' && projectFilter.organization !== organizationFilter.value) {
            projectFilter.organization = organizationFilter.value;
            projectFilter.value = [];
        }

        // If the project filter changes and the organization filter is not set, set it
        if (organizationFilter.value !== projectFilter.organization) {
            organizationFilter.value = projectFilter.organization;
        }
    }

    return filtered;
}
