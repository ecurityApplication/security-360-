export const navbarData = [
    {
        routeLink: 'incidentlogging',
        icon: 'bx bx-grid-alt',
        label: 'Incident logging',
        role:["GUEST","ANALYST","ROLE_ADMIN"]
    },
    {
        routeLink: 'escalation',
        icon: 'bx bx-table',
        label: 'Escalation',
        role:["GUEST","ANALYST","ROLE_ADMIN"]
    },
    {
        routeLink: 'userList',
        icon: 'bx bx-user',
        label: 'Roles and Users List',
        role:["ROLE_ADMIN"]
    },
    {
        routeLink: 'Stat',
        icon: 'bx bx-pie-chart-alt-2',
        label: 'Analytics',
        role:["GUEST","ANALYST","ROLE_ADMIN"]
    },
    {
        routeLink: 'monthlyKPIs',
        icon: 'bx bxs-bar-chart-alt-2',
        label: 'Monthly KPIs',
        role:["GUEST","ANALYST","ROLE_ADMIN"]
    },
    {
        routeLink: 'yearlyKPIs',
        icon: 'bx bx-line-chart',
        label: 'Yearly KPIs',
        role:["GUEST","ANALYST","ROLE_ADMIN"]
    }
];