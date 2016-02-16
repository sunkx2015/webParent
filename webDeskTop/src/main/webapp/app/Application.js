/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.Loader.setConfig({//启用ext动态加载机制,并设置要加载的路径
    enabled: true,	//开启动态加载的依赖加载功能，默认为false不开启
    paths: {
    	'My': 'app'
    }
});
Ext.define('Desktop.Application', {
    extend: 'Ext.app.Application',
    name: 'Desktop',
    launch: function () {
			Ext.toast({
	      	     html: '<font color=#336699>加载</font><font color=green>成功</font><font color=#336699>,欢迎使用!</font>',
	      	     title: '系统提示',
	      	     width: 200,
	      	     align: 'left'
			   });
//    	Ext.Ajax.request({
//    		url : "loadIndexHtml.do",
//    		method : 'post',
//    		timeout : 180000,
//    		async:false,
//    		scope : this,
//    		callback : function(options, success, response) {
//    			var respText = Ext.util.JSON.decode(response.responseText); 
//    			var status = respText.status;
//
//    			if(status==1){
//    				var loginname = respText.loginname;
//        			var username = respText.username;
//        			var orgcode = respText.orgcode;
//        			var orgname = respText.orgname;
//
//    				currentloginname = loginname;
//    				currentusername = username;
//    				currentorgcode = orgcode;
//    				currentorgname = orgname;
//    				tickTime();
//					Ext.toast({
//			      	     html: '<font color=#336699>加载</font><font color=green>成功</font><font color=#336699>,欢迎使用!</font>',
//			      	     title: '系统提示',
//			      	     width: 200,
//			      	     align: 'left'
//			      	});
//    			}else{
//    		      	Ext.MessageBox.alert("提示框","非润滑油用户不能登陆,请联系管理员!"+ "[<font color=red>" + respText.msg + "</font>]",function(){
//    					window.location.href='.'
//    				}); 
//    			}
//    		}
//    	});
    }
});
