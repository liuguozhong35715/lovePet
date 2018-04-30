import axios from 'axios'
export default {
    namespaced: true,
    state: {
        form: {
            goodsName: "",
            goodsType: "",
            goodsMaterial: "",
            goodsCanFor: "",
            goodsOnlyFor: "",
            goodsSize: "",
            goodsTaste: "",
            goodsSpecial: "",
            goodsRegion: "",
            goodsDate: "",
            goodsTime: "",
            goodsSupplier: "",
            goodsIntro: "",
            goodsPrice: "",
            goodsImg: ""
        },
        forms: {
            goodsName: "",
            goodsType: "",
            goodsMaterial: "",
            goodsCanFor: "",
            goodsOnlyFor: "",
            goodsSize: "",
            goodsTaste: "",
            goodsSpecial: "",
            goodsRegion: "",
            goodsDate: "",
            goodsTime: "",
            goodsSupplier: "",
            goodsIntro: "",
            goodsPrice: "",
            _id: ""
        },
        picID: [],
        curpage: 1,//页数
        eachpage: 5,//每页显示的条数
        maxpage: 0,//总页数
        total: 0,//总条数
        rows: [],
        isShow: true,
        isUpdate: true,
        goodsId: { id: "" }
    },

    mutations: {
        renderMsg(state, payload) {
            Object.assign(state, payload)
        },
        setCurPage(state, curpage) {
            state.curpage = curpage
        },
        setEachPage(state, eachpage) {
            state.eachpage = eachpage
        },
        // 即将修改
        willUpdata(state, scopeRow) {
            // console.log("11", state)
            state.isUpdate = false;
            state.forms.goodsName = scopeRow.goodsName;
            state.forms.goodsType = scopeRow.goodsType;
            state.forms.goodsMaterial = scopeRow.goodsMaterial;
            state.forms.goodsCanFor = scopeRow.goodsCanFor;
            state.forms.goodsOnlyFor = scopeRow.goodsOnlyFor;
            state.forms.goodsSize = scopeRow.goodsSize;
            state.forms.goodsTaste = scopeRow.goodsTaste;
            state.forms.goodsSpecial = scopeRow.goodsSpecial;
            state.forms.goodsRegion = scopeRow.goodsRegion;
            state.forms.goodsDate = scopeRow.goodsDate;
            state.forms.goodsTime = scopeRow.goodsTime;
            state.forms.goodsSupplier = scopeRow.goodsSupplier;
            state.forms.goodsIntro = scopeRow.goodsIntro;
            state.forms.goodsPrice = scopeRow.goodsPrice;
            state.forms._id = scopeRow._id;
        },
        // 取消修改
        cancelUpdata(state, payload) {
            state.isUpdate = true;
        },
        // 取消添加
        cancleAdd(state, payload) {
            // console.log("in", state);
            for (var item in state.form) {
                state.form[item] = "";
            }
        },
        // 返回列表
        backList(state, payload){
            state.isShow = true;  
        }
    },
    actions: {
        // 加载数据
        async getMsg(context) {
            // console.log("context",context)
            const { curpage, eachpage } = context.state
            // console.log(curpage, eachpage)
            const data = await fetch(`/goodsManage?page=${curpage}&rows=${eachpage}`).then(response => response.json())
            context.commit("renderMsg", data)
        },

        // 存数据
        async saveMsg(context) {
            // console.log(context)
            context.state.isShow = false;
            let obj = {
                goodsName: context.state.form.goodsName,
                goodsType: context.state.form.goodsType,
                goodsMaterial: context.state.form.goodsMaterial,
                goodsCanFor: context.state.form.goodsCanFor,
                goodsOnlyFor: context.state.form.goodsOnlyFor,
                goodsSize: context.state.form.goodsSize,
                goodsTaste: context.state.form.goodsTaste,
                goodsSpecial: context.state.form.goodsSpecial,
                goodsRegion: context.state.form.goodsRegion,
                goodsDate: context.state.form.goodsDate,
                goodsTime: context.state.form.goodsTime,
                goodsSupplier: context.state.form.goodsSupplier,
                goodsIntro: context.state.form.goodsIntro,
                goodsPrice: context.state.form.goodsPrice,
                goodsImg: context.state.form.goodsImg,
                manageId: sessionStorage.userId
            };
            axios.post("/goodsManage/", obj).then(function (res) {
                context.state.goodsId.id = res.data._id;
                // console.log(context.state.goodsId.id);

            })

        },
        // 删除数据
        async setDel(context, id) {
            await axios.delete(`/goodsManage/` + id)
            context.dispatch("getMsg")
        },

        // 修改数据
        async setUpdate(context, payload) {
            const data = await axios.put("/goodsManage/" + payload, context.state.forms);
            context.state.isUpdate = true;
            await context.dispatch('getMsg')
        },

        // 通过商品id获取图片的ID
        async getimgID(context) {
            // console.log("获取图片的ID")
            // console.log("qw", context)
            axios.get(`/goodsManage/?type=img&id=${context.state.goodsId.id}`).then(function (res) {
                context.state.picID[0] = res.data.rows[0]._id;
                // console.log(res.data.rows[0]._id);
            })
        },

        // 删除图片
        async delPic(context, payload) {
            await axios.delete(`/pictures/` + context.state.picID[0])
            context.dispatch("getMsg")
        },

        // async saveMsg(context,formValue) {
        //     let obj={
        //         goodsName:formValue.goodsName,
        //         goodsType:formValue.goodsType,
        //         goodsMaterial:formValue.goodsMaterial,
        //     };
        //     await fetch("/goodsManage/", {
        //         method: "POST",
        //         headers: {
        //             'Content-Type': 'application/x-www-form-urlencoded'
        //           },
        //         body: JSON.stringify(obj)
        //     })
        // },

    }
}