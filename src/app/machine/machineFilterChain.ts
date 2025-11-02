export class MachineFilterChain {
    private filters: Filter[] = [];

    addFilter(filter: Filter) {
        this.filters.push(filter);
    }

    applyFilters(input: string): string {
        return this.filters.reduce((acc, filter) => filter.filter(acc), input);
    }

    randomizeConfiguration(): void {
        this.filters.forEach(filter => filter.randomizeConfiguration());
    }

    toString(): string {
        let returnString : string = '';
        this.filters.forEach((filter, index) => {
            returnString += filter.toString();
        });
        return returnString;
    }
}