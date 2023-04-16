<script>
    	var bizData = [
		{
			EMP_ID      		: "1001",
			FNAME     			: "Jorge",
			LNAME   			: "Bugwak",
			BDATE      			: "January 01, 2000",
			GENDER     			: "MALE",
            ADDRESS				: "Flyover Maguikay",
			CONTACT_NO			: "09123456789",
			EMAIL_ADD			: "jorgebugwak@gmail.com",
			EMP_START_DATE		: "April 01, 2023",
			JOB_TITLE			: "Network Administrator",
			DEPARTMENT			: "IT DEPT.",
			MNGR_NAME			: "FJ",
			SALARY				: "2000/hr",
			EMP_STATUS			: "Full-time",
			WORK_SCHED			: "Monday-Friday, 08:00AM-05:00PM",
			EMERGENCY_INFO		: "09987654321",

			DEL_FLAG    		: true
            
		},
		{
			EMP_ID      		: "1002",
			FNAME     			: "Elmer",
			LNAME   			: "Alcano",
			BDATE      			: "January 01, 2000",
			GENDER     			: "MALE",
            ADDRESS				: "Flyover Maguikay",
			CONTACT_NO			: "09123456789",
			EMAIL_ADD			: "elmeralcano@gmail.com",
			EMP_START_DATE		: "April 01, 2023",
			JOB_TITLE			: "Senior Programmer",
			DEPARTMENT			: "IT DEPT.",
			MNGR_NAME			: "FJ",
			SALARY				: "5000/hr",
			EMP_STATUS			: "Full-time",
			WORK_SCHED			: "Monday-Friday, 08:00AM-05:00PM",
			EMERGENCY_INFO		: "09987654321",

			DEL_FLAG    		: true
		}
	];

	const bpDataOrganizer = {
		_filteredById : function(id){
			filteredBP = [];
			for(let i=0; i<bizData.length; i++){
				if(bizData[i].EMP_ID == id){
					filteredBP.push(bizData[i]);
				}
			}
			return filteredBP;
		},
		_updateById : function(id){
			let busyDialog = showBusyDialog("Please wait loading..");
				busyDialog.open();
			
			bizData.map(bp_id => {
				if (bp_id.BIZPART_ID == id) {
				 
						bp_id.NAME1    			= ui('BP_TYPE_REGNAME').getValue().trim();
						bp_id.TYPE     			= ui('BP_TYPE_INFO').getSelectedKey();
						bp_id.NAME1    			= ui('BP_TYPE_REGNAME').getValue().trim();
						bp_id.BIZPART_ID      	= ui('INPUT_BP_ID').getValue().trim();
						bp_id.EXT_PARTNER      	= ui('BP_TYPE_EXTPARTNER').getValue().trim();
						bp_id.SOURCE_SYS     	= ui('INPUT_CONTROL_INFO_SOURCE_SYS').getValue().trim();
						bp_id.DEL_FLAG    		= ui('CONTROL_INFO_DEL_FLAG').getState();
				}
				
			});
			screenMode._display(id);
			listingBp._getData(bizData);
			setTimeout(() => {busyDialog.close();}, 2000);
		}
	}

	const screenMode = {
		_id : "",
		_title : "",
		_mode : "",
		_create : function(){
			this._mode = "create";
			let bp_title = this._title;
			bp_title = "Create Business Partner";
			//this._clear();
			//Buttons
			ui("CREATE_BP_SAVE_BTN").setVisible(true);
			ui("CREATE_BP_EDIT_BTN").setVisible(true);
			ui("CREATE_BP_CANCEL_BTN").setVisible(false);

			//title and crumbs
			ui('BP_TITLE').setText(bp_title);
			ui('CREATE_BP_BRDCRMS').setCurrentLocationText(bp_title);
			ui("PANEL_FORM").setTitle("New Business Partner");

			//Fields
			ui('BP_TYPE_INFO').setEditable(true);
			ui('BP_TYPE_REGNAME').setEditable(true);
			ui('INPUT_BP_ID').setEditable(true);
			ui('BP_TYPE_EXTPARTNER').setEditable(true);
			ui('INPUT_CONTROL_INFO_SOURCE_SYS').setEditable(true);
			ui('CONTROL_INFO_DEL_FLAG').setEnabled(true);

			go_App_Right.to('CREATE_BP_PAGE');
		},
		_edit : function(){
			this._mode = "edit";
			//Buttons
			ui("CREATE_BP_SAVE_BTN").setVisible(true);
			ui("CREATE_BP_EDIT_BTN").setVisible(false);
			ui("CREATE_BP_CANCEL_BTN").setVisible(true);

			//Fields
			ui('BP_TYPE_INFO').setEditable(true);
			ui('BP_TYPE_REGNAME').setEditable(true);
			ui('INPUT_BP_ID').setEditable(false);
			ui('BP_TYPE_EXTPARTNER').setEditable(true);
			ui('INPUT_CONTROL_INFO_SOURCE_SYS').setEditable(true);
			ui('CONTROL_INFO_DEL_FLAG').setEnabled(true);
		},
		_display : function(id){
			this._mode = "display";
			this._id = id;
			let bp_title = this._title;
			bp_title = "Display Business Partner";
			//Buttons
			ui("CREATE_BP_SAVE_BTN").setVisible(false);
			ui("CREATE_BP_EDIT_BTN").setVisible(true);
			ui("CREATE_BP_CANCEL_BTN").setVisible(false);


			//fields with value
			let data = bpDataOrganizer._filteredById(id);
			console.log(data);
			if(data.length > 0){
				ui('EMP_ID').setValue(data[0].EMP_ID).setEditable(false);
       			ui('FNAME').setValue(data[0].FNAME).setEditable(true);
			    ui('LNAME').setValue(data[0].LNAME).setEditable(true);
				ui('BDATE').setValue(data[0].BDATE).setEditable(true);
				ui('GENDER').setValue(data[0].GENDER).setEditable(true);
				ui('ADDRESS').setValue(data[0].ADDRESS).setEditable(true);
				ui('CONTACT_NUM').setValue(data[0].CONTACT_NUM).setEditable(true);
				ui('EMAIL_ADD').setValue(data[0].EMAIL_ADD).setEditable(true);
				ui('START_DATE').setValue(data[0].START_DATE).setEditable(true);
				ui('JOB_TITLE').setValue(data[0].JOB_TITLE).setEditable(true);
				ui('DEPARTMENT').setValue(data[0].DEPARTMENT).setEditable(true);
				ui('MNGR_NAME').setValue(data[0].MNGR_NAME).setEditable(true);
				ui('SALARY').setValue(data[0].SALARY).setEditable(true);
				ui('EMP_STATUS').setValue(data[0].EMP_STATUS).setEditable(true);
				ui('WORK_SCHED').setValue(data[0].WORK_SCHED).setEditable(true);
				ui('EMERGENCY_INFO').setValue(data[0].EMERGENCY_INFO).setEditable(true);
        		
			
			
				//title and crumbs
				//ui('BP_TITLE').setText(bp_title);
				//ui('CREATE_BP_BRDCRMS').setCurrentLocationText(bp_title);
				//ui("PANEL_FORM").setTitle("Business Partner ID "+"("+data[0].BIZPART_ID+")");

				go_App_Right.to('CREATE_BP_PAGE');
			}			
		},
		_clear : function(){
			ui('BP_TYPE_INFO').setValue("");
			ui('BP_TYPE_REGNAME').setValue("");
			ui('INPUT_BP_ID').setValue("");
			ui('BP_TYPE_EXTPARTNER').setValue("");
			ui('INPUT_CONTROL_INFO_SOURCE_SYS').setValue("");
			ui('CONTROL_INFO_DEL_FLAG').setEnabled(true);
		}
	
	
	};
    const createBP = ()=> {
		/*let busyDialog = showBusyDialog("Please wait loading..");
				busyDialog.open();*/
    let createBPdetails = {
       
		EMP_ID   : ui("EMP_ID").getValue().trim(),
		FNAME  : ui("FNAME").getValue().trim(),
        LNAME : ui("LNAME").getValue().trim(),
        BDATE : ui("BDATE").getValue().trim(),
        GENDER : ui("GENDER").getValue().trim(),
        ADDRESS : ui("ADDRESS").getValue().trim(),
        CONTACT_NUM : ui("CONTACT_NUM").getValue().trim(),
        EMAIL_ADD: ui("EMAIL_ADD").getValue().trim(),
        START_DATE : ui("START_DATE").getValue().trim(),
        JOB_TITLE : ui("JOB_TITLE").getValue().trim(),
        DEPARTMENT : ui("DEPARTMENT").getValue().trim(),
        MNGR_NAME: ui("MNGR_NAME").getValue().trim(),
        SALARY: ui("SALARY").getValue().trim(),
        EMP_STATUS: ui("EMP_STATUS").getValue().trim(),
        WORK_SCHED: ui("WORK_SCHED").getValue().trim(),
        EMERGENCY_INFO: ui("EMERGENCY_INFO").getValue().trim(),
       

    };
        bizData.push( createBPdetails);
		screenMode._display( createBPdetails.EMP_ID);
		setTimeout(() => {busyDialog.close();}, 2000);
   
    
    /*ui("DELIVERY_ADDRESS").setValue(createBPdetails.APPDEV_TYPE).setEditable(false).addStyleClass('deliveryInput');
    ui("EMP_NAME").setValue(createBPdetails.APPDEV_NAME).setEditable(false);
    ui("EMP_PHONE").setValue(createBPdetails.APPDEV_NUMBER).setEditable(false);
    ui("EMP_EMAIL").setValue(createBPdetails.APPDEV_EMAIL).setEditable(false);
    ui("EMP_DELIVERY_DATE").setValue(createBPdetails.APPDEV_DELIVERYDATE).setEditable(false);
    ui("EMP_DELIVERY_TIME").setValue(createBPdetails.APPDEV_DELIVERYTIME).setEditable(false);
    ui("EMP_DELIVERY_INSTRUCTION").setValue(createBPdetails.APPDEV_DELIVERYINSTRUCTION).setEditable(false);
    ui("EMP_SHIPPING_METHOD").setValue(createBPdetails.APPDEV_SHIPMETHOD).setEditable(false);
    ui("EMP_SHIPPING_CARRIER").setValue(createBPdetails.APPDEV_SHIPCARRIER).setEditable(false);
    ui("EMP_TRACKING_NUMBER").setValue(createBPdetails.APPDEV_TRACKNUM).setEditable(false);
    ui("EMP_PACKAGE_WEIGHT").setValue(createBPdetails.APPDEV_PACKWEIGHT).setEditable(false);
    ui("EMP_PACKAGE_DIMENSION").setValue(createBPdetails.APPDEV_PACKDIMENSION).setEditable(false);
    ui("EMP_DELIVERY_CONFIRMATION").setValue(createBPdetails.APPDEV_DELIVERYCONFIRM).setEditable(false);
    ui("EMP_SIGNATURE_REQUIRED").setValue(createBPdetails.APPDEV_SIGNATURE).setEditable(false);
    ui("EMP_ORDER_NUMBER").setValue(createBPdetails.APPDEV_ORDERNUM).setEditable(false);
    ui("EMP_SHIPPING_COST").setValue(createBPdetails.APPDEV_SHIPCOST).setEditable(false);
    ui("EMP_INSURANCE").setValue(createBPdetails.APPDEV_INSURANCE).setEditable(false);
    ui("EMP_CUSTOMS_INFO").setValue(createBPdetails.APPDEV_CUSTOMSINFO).setEditable(false);
    ui("EMP_ORDER_STATUS").setValue(createBPdetails.APPDEV_ORDERSTATUS).setEditable(false);*/
}

const onEdit = () => {
	//buttons
	ui("CREATE_BP_SAVE_BTN").setVisible(true);
	ui("CREATE_BP_EDIT_BTN").setVisible(false);
	ui("CREATE_BP_CANCEL_BTN").setVisible(true);

	//fields
    ui("EMP_ID").setEditable(false);
    ui("FNAME").setEditable(true);
    ui("LNAME ").setEditable(true);
    ui("BDATE ").setEditable(true);
    ui("GENDER ").setEditable(true);
    ui("ADDRESS").setEditable(true);
    ui("CONTACT_NUM").setEditable(true);
    ui("EMAIL_ADD").setEditable(true);
    ui("START_DATE").setEditable(true);
    ui("JOB_TITLE").setEditable(true);
    ui("DEPARTMENT").setEditable(true);
    ui("MNGR_NAME").setEditable(true);
    ui("SALARY").setEditable(true);
    ui("EMP_STATUS").setEditable(true);
    ui("WORK_SCHED").setEditable(true);
    ui("EMERGENCY_INFO").setEditable(true);
    
}

function showBusyDialog(message){
return new sap.m.BusyDialog({text : message});
}



var lv_dialog_save = new sap.m.Dialog("COMPCODE_SAVE_DIALOG",{
title: "Confirmation",
beginButton: new sap.m.Button({
text:"Ok",
type:"Accept",
icon:"sap-icon://accept",
press:function(oEvt){
oEvt.getSource().getParent().close();
}
}),
endButton:new sap.m.Button({
text:"Cancel",
type:"Reject",
icon:"sap-icon://decline",
press:function(oEvt){
oEvt.getSource().getParent().close();
}
}),
content:[
new sap.m.HBox({
items:[
new sap.m.Label({text:"Confirm to create changes?"})
]
})
]
}).addStyleClass('sapUiSizeCompact');

//Table Binding:
const displayBp =  {
_get_data(search){
//var busy_diag = fn_show_busy_dialog("Please wait. Loading...");
//busy_diag.open();
const dataforDisplayBP = [
{
BIZPART_ID  : "10001",
NAME1       : "Noel Lehitimas",
NAME2       : "The Great Buhay Igit"
},
{
BIZPART_ID  : "10002",
NAME1       : "Noel Lehitimas2",
NAME2       : "The Great Buhay Igit2"
}
];
this._bind_data(dataforDisplayBP);
//busy_diag.close();
},
_bind_data(data){
ui("DISPLAY_BP_TABLE").unbindRows();
var lt_model = new sap.ui.model.json.JSONModel();
lt_model.setSizeLimit(data.length);
lt_model.setData(data);
ui('DISPLAY_BP_TABLE').setModel(lt_model).bindRows("/");
ui("DISPLAY_BP_TABLE").setVisible(true);
ui('DISPLAY_BP_TABLE_LABEL').setText("List (" + data.length + ")");
//fn_clear_table_sorter("DISPLAY_BP_TABLE");
}
};

const listingBp = {
		_getData : function(data){
			ui("BP_LISTING_TABLE").unbindRows();
			
			var lt_model = new sap.ui.model.json.JSONModel();
				lt_model.setSizeLimit(data.length);
				lt_model.setData(data);
				
			ui('BP_LISTING_TABLE').setModel(lt_model).bindRows("/");
			ui("BP_LISTING_TABLE").setVisible(true);
			
			ui('BP_LISTING_LABEL').setText("Business Partner (" + data.length + ")");
		}
	}



    </script>