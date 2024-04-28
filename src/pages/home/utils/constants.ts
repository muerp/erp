import { MenuItem } from "./interface";

export const defaultMenus: MenuItem[] = [
    {
        icon: 'set',
        title: '',
        path: '/aa',
        children: [
            {
                icon: 'gongsi',
                title: '',
                path: '/aa',
            },
            {
                icon: 'bumen',
                title: '',
                path: '/aa/cc',
            },
            {
                icon: 'jiagou',
                title: '',
                path: '/aa/dd',
            },
            {
                icon: 'members',
                title: '',
                path: '/aa/aa',
            },
            {
                icon: 'rizhi',
                title: '',
                path: '/aa/ee',
            },
        ]
    },
    {
        icon: 'authority',
        title: '',
        path: '/dd',
        children: [
            {
                icon: 'tree-table',
                title: '',
                path: '/dd',
            },
        ]
    },
    {
        icon: 'group',
        title: '',
        path: '/cc',
        children: [
            {
                icon: 'admin',
                title: '',
                path: '/cc',
            },
            {
                icon: 'user',
                title: '',
                path: '/cc/ff',
            }
        ]

    }
]
export const testMenus = [
    {
        icon: 'set',
        title: '系统设置',
        children: [
            {
                icon: 'jiagou',
                title: '部门管理',
                path: '/aa',
            },
            {
                icon: 'bumen',
                title: '岗位管理',
                path: '/aa/cc',
            },
            {
                icon: 'members',
                title: '员工管理',
                path: '/aa/dd',
            },
            {
                icon: 'tree1',
                title: '菜单管理',
                path: '/aa/aa',
            },
            {
                icon: 'rizhi',
                title: '日志管理',
                path: '/aa/ee',
            },
        ]
    },
    {
        icon: 'authority',
        title: '',
        children: [
            {
                icon: 'tree-table',
                title: '',
                path: '/dd',
            },
        ]
    },
    {
        icon: 'group',
        title: '',
        children: [
            {
                icon: 'admin',
                title: '',
                path: '/cc',
            },
            {
                icon: 'user',
                title: '',
                path: '/cc/ff',
            }
        ]

    }
]
export enum SeartFrameType {
    input = 1,
    select = 2,
    date = 3,
    dateRange = 4,
    search = 99,
    reset = 100,
}
export const testSearch = [
    {
        type: 1,
        label: '部门名称',
        placeholder: '请输入部门名称',
        key: 'name',
    },
    {
        type: 2,
        label: '状态',
        placeholder: '部门状态',
        key: 'state',
        menus: [
            { value: 2, label: '正常' },
            { value: 1, label: '停用' },
        ]
    },
    {
        type: 3,
        label: '创建日期',
        key: 'create_time',
    },
    {
        type: 4,
        label: '日期范围',
        key: 'range',
    },
    {
        type: 99
    },
    {
        type: 100,
    }
]

export const testTree = [
    {
        label: '总公司',
        id: '1',
        children: [
            {
                label: '分公司1',
                id: '2',
                children: [
                    {
                        id: '3',
                        label: '分公司11',
                    }
                ]
            },
            {
                label: '分公司2',
                id: '4',
                children: [
                    {
                        id: '5',
                        label: '分公司11',
                    }
                ]
            },
            {
                label: '分公司3',
                id: '7',
                children: [
                    {
                        id: '6',
                        label: '分公司11',
                    }
                ]
            },
            {
                label: '分公司4',
                id: '8',
                children: [
                    {
                        label: '分公司11',
                        id: '8',
                    }
                ]
            }
        ]
    }
]

export enum ButtonType {
    add = 1,
    modify = 2,
    delete = 3,
    import = 4,
    export = 5,
    hideSearch = 80,
    refresh = 81,
    colkey = 82,
}
export const ButtonTypeConfig = {
    1: { icon: 'add', label: '增加', type: 'primary' },
    2: { icon: 'modify', label: '修改', type: 'success' },
    3: { icon: 'trash', label: '删除', type: 'danger' },
    4: { icon: 'export', label: '导入', type: 'info' },
    5: { icon: 'import', label: '导出', type: 'warning' },
    10: { icon: 'search', tip: '隐藏搜索', type: 'default' },
    11: { icon: 'reset', tip: '刷新', type: 'info' },
    60: { icon: 'col', tip: '列显示', type: 'warning' },

}
export const testButtons = [
    {
        type: 1
    },
    {
        type: 2
    },
    {
        type: 3
    },
    {
        type: 4
    },
    {
        type: 5
    },
    {
        type: 10
    },
    {
        type: 11
    },
    {
        type: 60,
    }
]

export enum HeaderType {
    select = 1,
    text = 2,
    switch = 3,
    time = 4,
    icon = 5,
    state = 6,
    collapse = 7,
    opa = 100,
}
export const testTables = {
    dataUrl: '',
    select: true,
    buttonType: 'text', //'text'|'round'|'plain'
    headers: [
        {
            "type": 1,
            label: '选择',
            width: 120,
            url: '',
            "menus": [
                {
                    "value": 1,
                    "label": "状态1"
                },
                {
                    "value": 2,
                    "label": "状态2"
                }
            ],
            "key": "key1"
        },
        {
            "type": 2,
            label: '显示',
            "key": "key2"
        },
        {
            "type": 3,
            label: '开关',
            url: '',
            "key": "key3"
        },
        {
            "type": 4,
            width: 180,
            label: '时间',
            "key": "key4"
        },
        {
            "type": 5,
            label: '图标',
            "key": "key5"
        },
        {
            "type": 6,
            label: '状态',
            "key": "key6",
            map: {
                1: {
                    label: '成功',
                    type: 'primary'
                },
                2: {
                    label: '失败',
                    type: 'danger'
                },
                3: {
                    label: '信息',
                    type: 'info'
                },
                4: {
                    label: '警告',
                    type: 'warning'
                },
                5: {
                    label: '成功',
                    type: 'success'
                }
            }
        },
        {
            "type": 100,
            label: '操作',
            width: 280,
            url: '',
            "buttons": [
                {
                    "type": 1
                },
                {
                    "type": 2
                },
                {
                    "type": 3
                },
                {
                    "type": 4
                },
                {
                    "type": 5
                }
            ],
            "key": "key100"
        }
    ]
}