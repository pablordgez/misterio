export class MachineFilterChain {
    private filters: Filter[] = [];

    addFilter(filter: Filter) {
        this.filters.push(filter);
    }

    applyFilters(input: string): string {
        return this.filters.reduce((acc, filter) => filter.filter(acc), input);
    }
}