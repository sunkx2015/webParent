/*!
 * 设置底部栏的菜单
 */

Ext.define('Desktop.view.main.Main', {
    extend: 'Ext.ux.desktop.App',

    requires: [
        'Ext.window.MessageBox',

        'Ext.ux.desktop.ShortcutModel',

       //'Desktop.view.main.SystemStatus',
       //'Desktop.view.main.VideoWindow',
       //'Desktop.view.main.GridWindow',
       //'Desktop.view.main.TabWindow',
       //'Desktop.view.main.AccordionWindow',
       'Desktop.view.main.Notepad',
        'Desktop.view.main.BogusMenuModule',
        'Desktop.view.main.BogusModule',

//        'Desktop.Blockalanche',
        'Desktop.view.main.Settings'
    ],

    init: function() {
        // custom logic before getXYZ methods get called...

        this.callParent();

        // now ready...
    },

    getModules : function(){
        return [
           //new Desktop.view.main.VideoWindow(),
            //new Desktop.Blockalanche(),
            //new Desktop.view.main.SystemStatus(),
            //new Desktop.view.main.GridWindow(),
            //new Desktop.view.main.TabWindow(),
            //new Desktop.view.main.AccordionWindow(),
            new Desktop.view.main.Notepad(),
            new Desktop.view.main.BogusMenuModule(),
            new Desktop.view.main.BogusModule()
        ];
    },
	//右键
    getDesktopConfig: function () {
        var me = this, 
        ret = me.callParent();

        return Ext.apply(ret, {
            //cls: 'ux-desktop-black',

            contextMenuItems: [
                { text: '个性化', handler: me.onSettings, scope: me }//右键菜单
            ],

            shortcuts: Ext.create('Ext.data.Store', {
                model: 'Ext.ux.desktop.ShortcutModel',
                data: [//桌面项目
                    { name: '表格', iconCls: 'grid-shortcut', module: 'grid-win' },
                    { name: '讨论组', iconCls: 'accordion-shortcut', module: 'acc-win' },
                    { name: 'Notepad', iconCls: 'notepad-shortcut', module: 'notepad' },
                    { name: '系统状态', iconCls: 'cpu-shortcut', module: 'systemstatus'}
                ]
            }),

            wallpaper: 'Ext/resources/images/wallpapers/Blue-Sencha.jpg',
            wallpaperStretch: false
        });
    },

    //开始按钮
    getStartConfig : function() {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            title: '设置',
            iconCls: 'user',
            height: 300,
            toolConfig: {
                width: 100,
                items: [
                    {
                        text:'设置',
                        iconCls:'settings',
                        handler: me.onSettings,
                        scope: me
                    },
                    '-',
                    {
                        text:'退出',
                        iconCls:'logout',
                        handler: me.onLogout,
                        scope: me
                    }
                ]
            }
        });
    },
	//快速启动栏
    getTaskbarConfig: function () {
        var ret = this.callParent();

        return Ext.apply(ret, {
            quickStart: [
                { name: '讨论组', iconCls: 'accordion', module: 'acc-win' },
                { name: '表格', iconCls: 'icon-grid', module: 'grid-win' }
            ],
            trayItems: [
                { xtype: 'trayclock', flex: 1 }
            ]
        });
    },
	//设置
    onLogout: function () {
        Ext.Msg.confirm('退出', '确定退出吗？');
    },
	//退出
    onSettings: function () {
        var dlg = new Desktop.view.main.Settings({
            desktop: this.desktop
        });
        dlg.show();
    }
});