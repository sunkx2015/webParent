/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
Ext.application({
    name: 'Desktop',
	
    extend: 'Desktop.Application',
    
    autoCreateViewport: 'Desktop.view.main.Main',//在触发launch函数之前自动加载并实例化AppName.view
    
    controllers: ["main.MainController"]//应用程序使用的控制器
});
