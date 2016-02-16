/**
 * 多文件上传组件 
 */
Ext.define('Ext.swfupload.UploadDialog',{
	extend : 'Ext.Window',
	alias : 'widget.uploaddialog',
	title : '附件',
	width : 600,
	height: 300,
	closeAction:'destory',
//  maximizable: true,
//  minimizable: true,
	layout : 'fit',
	modal : true,
	addFileBtnText : '添加',
	uploadBtnText : '上传',
	removeBtnText : '清空',
	cancelBtnText : '取消',
	upload_url  : null,
	post_params : {},
	file_size_limit : 100,//MB
	file_types : '*.*',
	file_types_description : 'All Files',
	file_upload_limit : 50,
	file_queue_limit : 1,
    registerItems:{
        uploadGrid : null
    },
	flash_url : "ext/packages/ext-ux/UploadDialog/swfupload.swf",
	flash9_url : "ext/packages/ext-ux/UploadDialog/swfupload_fp9.swf",
	initComponent : function(){	
		var me = this;
		me.registerItems.uploadGrid = me.createRelationGrid();
		me.items = [me.registerItems.uploadGrid];
		me.tbar = [{
			        xtype:'button',
			        itemId: 'addFileBtn',
			        glyph:0xf093,
			        text : me.addFileBtnText
		        },{ xtype: 'tbseparator' },{
		        	xtype : 'button',
		        	itemId : 'uploadBtn',
		        	glyph:0xf062, 
		        	text : me.uploadBtnText,
		        	scope : me,
		        	handler : me.onUpload
		        },{ xtype: 'tbseparator' },{
		        	xtype : 'button',
		        	itemId : 'removeBtn',
		        	glyph: 0xf014,
		        	text : me.removeBtnText,
		        	scope : me,
		        	handler : me.onRemove
		        },{ xtype: 'tbseparator' },{
		        	xtype : 'button',
		        	itemId : 'cancelBtn',
		        	glyph:0xf011,
		        	disabled : true,
		        	text : me.cancelBtnText,
		        	scope : me,
		        	handler : me.onCancelUpload
		}];
		
		me.buttons = [{
			text:"关闭",
			glyph:0xf00d,
			handler : function(button,e){
				if(me.callback != null){
					me.callback();
				}
				me.close();
			}
		}];
		
		
		this.callParent();
		this.down('button[itemId=addFileBtn]').on({			
			afterrender : function(btn){
				var config = this.getSWFConfig(btn);		
				this.swfupload = new SWFUpload(config);
				Ext.get(this.swfupload.movieName).setStyle({
					position : 'absolute',
					top : 0,
					left : -2
				});	
			},
			scope : this,
			buffer:300
		});
	},
    //创建关系表格
    createRelationGrid : function(){
        var uploadGrid = Ext.create('Ext.grid.Panel',{
        	frame : true,
        	columnLines: true,
        	forceFit : true,
        	viewConfig:{
        		stripeRows : true
        	},
        	autoScroll:true,
        	store : Ext.create('Ext.data.JsonStore',{
 	       		autoLoad : false,
 	       		fields : ['id','name','type','size','percent','status','fileName']
 	       	}),
        	columns : [
        	   		{text: '文件名', width: 100,dataIndex: 'name'},
        	   		{text: '自定义文件名', width: 130,dataIndex: 'fileName'},
        	        {text: '类型', width: 70,dataIndex: 'type'},
        	        {text: '大小', width: 70,dataIndex: 'size',renderer:function(v){
        	           	return Ext.util.Format.fileSize(v);
        	        }},
        	        {text: '进度', width: 130,dataIndex: 'percent',renderer:function(v){        	
        	   			var stml =
        	   				'<div>'+
        	   					'<div style="border:1px solid #008000;height:10px;width:115px;margin:2px 0px 1px 0px;float:left;">'+		
        	   						'<div style="float:left;background:#FFCC66;width:'+v+'%;height:8px;"><div></div></div>'+
        	   					'</div>'+
        	   				//'<div style="text-align:center;float:right;width:40px;margin:3px 0px 1px 0px;height:10px;font-size:12px;">{3}%</div>'+			
        	   			'</div>';
        	   			return stml;
        	         }},
        	         {text: '状态', flex:1,dataIndex: 'status',renderer:function(v){
        	   			var status;
        	   			if(v==-1){
        	   				status = "等待上传";
        	   			}else if(v==-2){
        	   				status =  "上传中...";
        	   			}else if(v==-3){
        	   				status =  "<div style='color:red;'>上传失败</div>";
        	   			}else if(v==-4){
        	   				status =  "上传成功";
        	   			}else if(v==-5){
        	   				status =  "停止上传";
        	   			}		
        	   			return status;
        	   		 }}
        	       ],
        	       plugins: [
        	           Ext.create('Ext.grid.plugin.CellEditing', {
        	               clicksToEdit: 1
        	           })
        	       ] 
        });
        return uploadGrid;
    },
	getSWFConfig : function(btn){
		var me = this;
		var placeHolderId = Ext.id();
		var em = btn.getEl().child('em');
		if(em==null){
			em = Ext.get(btn.getId()+'-btnWrap');
		}		
		em.setStyle({
			position : 'relative',
			display : 'block'
		});
		em.createChild({
			tag : 'div',
			id : placeHolderId
		});
		return {
			debug: me.debug,
			flash_url : me.flash_url,
			flash9_url : me.flash9_url,	
			upload_url: me.upload_url,
			post_params: me.post_params||{savePath:'upload\\'},
			file_size_limit : (me.file_size_limit*1024),
			file_types : me.file_types,
			file_types_description : me.file_types_description,
			file_upload_limit : me.file_upload_limit,
			file_queue_limit : me.file_queue_limit,
			button_width: em.getWidth(),
			button_height: em.getHeight(),
			button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
			button_cursor: SWFUpload.CURSOR.HAND,
			button_placeholder_id: placeHolderId,
			custom_settings : {
				scope_handler : me
			},
			swfupload_preload_handler : me.swfupload_preload_handler,
			file_queue_error_handler : me.file_queue_error_handler,
			swfupload_load_failed_handler : me.swfupload_load_failed_handler,
			upload_start_handler : me.upload_start_handler,
			upload_progress_handler : me.upload_progress_handler,
			upload_error_handler : me.upload_error_handler,
			upload_success_handler : me.upload_success_handler,
			upload_complete_handler : me.upload_complete_handler,
			file_queued_handler : me.file_queued_handler
		};
	},
	swfupload_preload_handler : function(){
		if (!this.support.loading) {
			Ext.Msg.show({
				title : '提示',
				msg : '浏览器Flash Player版本太低,不能使用该上传功能！',
				width : 250,
				icon : Ext.Msg.ERROR,
				buttons :Ext.Msg.OK
			});
			return false;
		}
	},
	file_queue_error_handler : function(file, errorCode, message){
		switch(errorCode){
			case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED : msg('上传文件列表数量超限,不能选择！');
			break;
			case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT : msg('文件大小超过限制, 不能选择！');
			break;
			case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE : msg('该文件大小为0,不能选择！');
			break;
			case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE : msg('该文件类型不允许上传！');
			break;
		}
		function msg(info){
			Ext.Msg.show({
				title : '提示',
				msg : info,
				width : 250,
				icon : Ext.Msg.WARNING,
				buttons :Ext.Msg.OK
			});
		}
	},
	swfupload_load_failed_handler : function(){
		Ext.Msg.show({
			title : '提示',
			msg : 'SWFUpload加载失败！',
			width : 180,
			icon : Ext.Msg.ERROR,
			buttons :Ext.Msg.OK
		});
	},
	upload_start_handler : function(file){
		var me = this.settings.custom_settings.scope_handler;
		me.down('#cancelBtn').setDisabled(false);	
		var rec = me.registerItems.uploadGrid.getStore().getById(file.id);
		this.setFilePostName(encodeURIComponent(rec.get('fileName')));
	},
	upload_progress_handler : function(file, bytesLoaded, bytesTotal){
		var me = this.settings.custom_settings.scope_handler;		
		var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);
		percent = percent == 100? 99 : percent;
       	var rec = me.registerItems.uploadGrid.getStore().getById(file.id);
       	rec.set('percent', percent);
		rec.set('status', file.filestatus);
		rec.commit();
	},
	upload_error_handler : function(file, errorCode, message){
		var me = this.settings.custom_settings.scope_handler;		
		var rec = me.registerItems.uploadGrid.getStore().getById(file.id);
       	rec.set('percent', 0);
		rec.set('status', file.filestatus);
		rec.commit();
	},
	upload_success_handler : function(file, serverData, responseReceived){
		var me = this.settings.custom_settings.scope_handler;		
		var rec = me.registerItems.uploadGrid.getStore().getById(file.id);
		if(Ext.JSON.decode(serverData).success){			
	       	rec.set('percent', 100);
			rec.set('status', file.filestatus);			
		}else{
			rec.set('percent', 0);
			rec.set('status', SWFUpload.FILE_STATUS.ERROR);
		}
		rec.commit();
		if (this.getStats().files_queued > 0 && this.uploadStopped == false) {
			this.startUpload();
		}else{
			me.showBtn(me,true);
		}
	},
	upload_complete_handler : function(file){
		
	},
	file_queued_handler : function(file){
		var me = this.settings.custom_settings.scope_handler;
		me.registerItems.uploadGrid.getStore().add({
			id : file.id,
			name : file.name,
			fileName : file.name,
			size : file.size,
			type : file.type,
			status : file.filestatus,
			percent : 0
		});
	},
	onUpload : function(){
		var store = this.registerItems.uploadGrid.getStore();
		if (this.swfupload&&store.getCount()>0) {
//			var itemArray=[];
			var fileName;
 			Ext.each(store.getRange(),function(record){
// 				itemArray.push(record.data.name);
 				fileName = record.data.name;
	   		});
 			this.post_params.fileName = fileName;
 			this.swfupload.setPostParams(this.post_params);
			if (this.swfupload.getStats().files_queued > 0) {
				this.showBtn(this,false);
				this.swfupload.uploadStopped = false;		
				this.swfupload.startUpload();
			}
		}
	},
	showBtn : function(me,bl){
		me.down('#addFileBtn').setDisabled(!bl);
		me.down('#uploadBtn').setDisabled(!bl);
		me.down('#removeBtn').setDisabled(!bl);
		me.down('#cancelBtn').setDisabled(bl);	
	},
	onRemove : function(){
		var ds = this.registerItems.uploadGrid.getStore()
		for(var i=0;i<ds.getCount();i++){
			var record =ds.getAt(i);
			var file_id = record.get('id');
			this.swfupload.cancelUpload(file_id,false);			
		}
		ds.removeAll();
		this.swfupload.uploadStopped = false;
	},
	onCancelUpload : function(){
		if (this.swfupload) {
			this.swfupload.uploadStopped = true;
			this.swfupload.stopUpload();
			this.showBtn(this,true);
		}
	}
});