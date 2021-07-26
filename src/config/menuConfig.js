import {
    HomeOutlined,
    PieChartOutlined,
    AccountBookOutlined,
    ShopOutlined,
    BarChartOutlined,
    RadarChartOutlined,
    BarsOutlined,
    UserAddOutlined,
    SmileOutlined
} from '@ant-design/icons';

const menuList = [
    {
        title: '首页',
        key: '/home',
        icon: <HomeOutlined />
    },
    {
        title: '商品',
        key: 'sub1',
        icon: <ShopOutlined />,
        children: [
            {
                title: '品类管理',
                key: '/shop/category',
                icon: <ShopOutlined />
            },
            {
                title: '商品管理',
                key: '/shop/commodity',
                icon: <AccountBookOutlined />
            }
        ]
    },
    {
        title: '用户管理',
        key: '/user',
        icon: <UserAddOutlined />
    },
    {
        title: '角色管理',
        key: '/role',
        icon: <SmileOutlined />
    },
    {
        title: '图形图表',
        key: 'sub2',
        icon: <PieChartOutlined />,
        children: [
            {
                title: '柱形图',
                key: '/graphical/cylindrical',
                icon: <BarChartOutlined />
            },
            {
                title: '折线图',
                key: '/graphical/brokenLine',
                icon: <RadarChartOutlined />
            },
            {
                title: '饼图',
                key: '/graphical/pieChart',
                icon: <PieChartOutlined />
            }
        ]
    },
]

export default menuList;