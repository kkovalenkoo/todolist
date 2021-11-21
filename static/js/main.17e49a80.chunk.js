(this.webpackJsonptodolist=this.webpackJsonptodolist||[]).push([[0],{102:function(t,e,a){},127:function(t,e,a){"use strict";a.r(e);var n,i,o=a(3),s=a(0),c=a.n(s),r=a(10),d=a.n(r),l=(a(102),a(49)),u=a(8),j=a(171),b=a(172),f=a(173),p=a(164),O=a(129),h=a(167),m=a(175),g=a(174),k=a(16),x=a(17),v=a(79),C=a.n(v).a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"API-KEY":"8984ca38-6e26-4fb2-a385-4373d690c5de"}}),T=function(t){return C.post("auth/login",t)},I=function(){return C.delete("auth/login")},y=function(){return C.get("auth/me")},A=function(){return C.get("todo-lists")},w=function(t){return C.post("todo-lists",{title:t})},L=function(t){return C.delete("todo-lists/".concat(t))},S=function(t,e){return C.put("todo-lists/".concat(t),{title:e})},F=function(t){return C.get("todo-lists/".concat(t,"/tasks"))},P=function(t,e){return C.delete("todo-lists/".concat(t,"/tasks/").concat(e))},E=function(t,e){return C.post("todo-lists/".concat(t,"/tasks"),{title:e})},_=function(t,e,a){return C.put("todo-lists/".concat(t,"/tasks/").concat(e),a)};!function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(n||(n={})),function(t){t[t.Low=0]="Low",t[t.Middle=1]="Middle",t[t.Hi=2]="Hi",t[t.Urgently=3]="Urgently",t[t.Later=4]="Later"}(i||(i={}));var N=function(t,e){t.messages.length?e(K({error:t.messages[0]})):e(K({error:"some error"})),e(J({status:"failed"}))},z=function(t,e){e(J({status:"failed"})),e(K({error:t.message?t.message:"some error"}))},D=a(27),M=Object(D.b)({name:"auth",initialState:{isLoggedIn:!1},reducers:{setIsLoggedInAC:function(t,e){t.isLoggedIn=e.payload.isLoggedIn}}}),B=M.reducer,q=M.actions.setIsLoggedInAC,H=Object(D.b)({name:"app",initialState:{status:"idle",error:null,isInitialized:!1},reducers:{setAppInitializedAC:function(t,e){t.isInitialized=e.payload.isInitialized},setAppStatusAC:function(t,e){t.status=e.payload.status},setAppErrorAC:function(t,e){t.error=e.payload.error}}}),R=H.reducer,U=H.actions,Y=U.setAppInitializedAC,J=U.setAppStatusAC,K=U.setAppErrorAC,W=Object(D.b)({name:"todolists",initialState:[],reducers:{addTodolistAC:function(t,e){t.unshift(Object(x.a)(Object(x.a)({},e.payload.todolist),{},{filter:"all",status:"idle"}))},removeTodolistAC:function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.id}));a>-1&&t.splice(a,1)},changeTodolistTitleAC:function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.id}));t[a].title=e.payload.title},changeTodolistFilterAC:function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.id}));t[a].filter=e.payload.filter},changeTodolistStatusAC:function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.id}));t[a].status=e.payload.status},setTodolistsAC:function(t,e){return e.payload.todolists.map((function(t){return Object(x.a)(Object(x.a)({},t),{},{filter:"all",status:"idle"})}))}}}),V=W.reducer,G=W.actions,Q=G.addTodolistAC,X=G.setTodolistsAC,Z=G.removeTodolistAC,$=G.changeTodolistTitleAC,tt=G.changeTodolistFilterAC,et=G.changeTodolistStatusAC,at=Object(D.b)({name:"tasks",initialState:{},reducers:{removeTaskAC:function(t,e){var a=t[e.payload.todolistId],n=a.findIndex((function(t){return t.id===e.payload.taskId}));n>-1&&a.splice(n,1)},addTaskAC:function(t,e){t[e.payload.task.todoListId].unshift(e.payload.task)},updateTaskAC:function(t,e){var a=t[e.payload.todolistId],n=a.findIndex((function(t){return t.id===e.payload.taskId}));n>-1&&(a[n]=Object(x.a)(Object(x.a)({},a[n]),e.payload.domainModel))},setTasksAC:function(t,e){t[e.payload.todolistId]=e.payload.tasks}},extraReducers:function(t){t.addCase(Q,(function(t,e){t[e.payload.todolist.id]=[]})),t.addCase(Z,(function(t,e){delete t[e.payload.id]})),t.addCase(X,(function(t,e){e.payload.todolists.forEach((function(e){t[e.id]=[]}))}))}}),nt=at.reducer,it=at.actions,ot=it.removeTaskAC,st=it.addTaskAC,ct=it.updateTaskAC,rt=it.setTasksAC,dt=function(t,e,a){return function(n,i){var o=i().tasks[t].find((function(t){return t.id===e}));if(o){var s=Object(x.a)({status:o.status,title:o.title,description:o.description,priority:o.priority,startDate:o.startDate,deadline:o.deadline},a);_(t,e,s).then((function(i){0===i.data.resultCode?n(ct({todolistId:t,taskId:e,domainModel:a})):N(i.data,n)})).catch((function(t){z(t,n)}))}}},lt=a(168),ut=a(128),jt=a(25),bt=a(176),ft=a(165),pt=c.a.memo((function(t){var e=t.addItem,a=t.disabled,n=void 0!==a&&a;console.log("AddItemForm called");var i=Object(s.useState)(""),c=Object(jt.a)(i,2),r=c[0],d=c[1],l=Object(s.useState)(null),u=Object(jt.a)(l,2),j=u[0],b=u[1],f=function(){""!==r.trim()?(e(r),d("")):b("Title is required")};return Object(o.jsxs)("div",{children:[Object(o.jsx)(bt.a,{variant:"outlined",disabled:n,error:!!j,value:r,onChange:function(t){d(t.currentTarget.value)},onKeyPress:function(t){null!==j&&b(null),"Enter"===t.key&&f()},label:"Title",helperText:j}),Object(o.jsx)(p.a,{color:"primary",onClick:f,disabled:n,children:Object(o.jsx)(ft.a,{})})]})})),Ot=a(86),ht=c.a.memo((function(t){console.log("EditableSpan called");var e=Object(s.useState)(!1),a=Object(jt.a)(e,2),n=a[0],i=a[1],c=Object(s.useState)(t.value),r=Object(jt.a)(c,2),d=r[0],l=r[1];return n?Object(o.jsx)(bt.a,{value:d,onChange:function(t){l(t.currentTarget.value)},autoFocus:!0,onBlur:function(){i(!1),t.onChange(d)}}):Object(o.jsx)("span",{onDoubleClick:function(){i(!0),l(t.value)},children:t.value})})),mt=a(166),gt=a(178),kt=c.a.memo((function(t){var e=Object(s.useCallback)((function(){return t.removeTask(t.todolistId,t.task.id)}),[t.task.id,t.todolistId]),a=Object(s.useCallback)((function(e){var a=e.currentTarget.checked;t.changeTaskStatus(t.todolistId,t.task.id,a?n.Completed:n.New)}),[t.task.id,t.todolistId]),i=Object(s.useCallback)((function(e){t.changeTaskTitle(t.todolistId,t.task.id,e)}),[t.task.id,t.todolistId]);return Object(o.jsxs)("div",{className:t.task.status===n.Completed?"is-done":"",children:[Object(o.jsx)(gt.a,{checked:t.task.status===n.Completed,color:"primary",onChange:a}),Object(o.jsx)(ht,{value:t.task.title,onChange:i}),Object(o.jsx)(p.a,{onClick:e,children:Object(o.jsx)(mt.a,{})})]},t.task.id)})),xt=c.a.memo((function(t){var e=t.demo,a=void 0!==e&&e,i=Object(Ot.a)(t,["demo"]);console.log("Todolist called");var c=Object(k.b)();Object(s.useEffect)((function(){var t;a||c((t=i.todolist.id,function(e){e(J({status:"loading"})),F(t).then((function(a){e(J({status:"succeeded"})),e(rt({tasks:a.data.items,todolistId:t}))}))}))}),[c,i.todolist.id]);var r=Object(s.useCallback)((function(t){i.addTask(t,i.todolist.id)}),[i.addTask,i.todolist.id]),d=Object(s.useCallback)((function(t){i.changeTodolistTitle(i.todolist.id,t)}),[i.todolist.id,i.changeTodolistTitle]),l=Object(s.useCallback)((function(){return i.changeFilter("all",i.todolist.id)}),[i.todolist.id,i.changeFilter]),u=Object(s.useCallback)((function(){return i.changeFilter("active",i.todolist.id)}),[i.todolist.id,i.changeFilter]),j=Object(s.useCallback)((function(){return i.changeFilter("completed",i.todolist.id)}),[i.todolist.id,i.changeFilter]),b=i.tasks;return"active"===i.todolist.filter&&(b=i.tasks.filter((function(t){return t.status===n.New}))),"completed"===i.todolist.filter&&(b=i.tasks.filter((function(t){return t.status===n.Completed}))),Object(o.jsxs)("div",{children:[Object(o.jsxs)("h3",{children:[Object(o.jsx)(ht,{value:i.todolist.title,onChange:d}),Object(o.jsx)(p.a,{onClick:function(){i.removeTodolist(i.todolist.id)},disabled:"loading"===i.todolist.status,children:Object(o.jsx)(mt.a,{})})]}),Object(o.jsx)(pt,{addItem:r,disabled:"loading"===i.todolist.status}),Object(o.jsx)("div",{children:b.map((function(t){return Object(o.jsx)(kt,{task:t,todolistId:i.todolist.id,removeTask:i.removeTask,changeTaskTitle:i.changeTaskTitle,changeTaskStatus:i.changeTaskStatus},t.id)}))}),Object(o.jsxs)("div",{style:{paddingTop:"10px"},children:[Object(o.jsx)(h.a,{variant:"all"===i.todolist.filter?"outlined":"text",onClick:l,color:"default",children:"All"}),Object(o.jsx)(h.a,{variant:"active"===i.todolist.filter?"outlined":"text",onClick:u,color:"primary",children:"Active"}),Object(o.jsx)(h.a,{variant:"completed"===i.todolist.filter?"outlined":"text",onClick:j,color:"secondary",children:"Completed"})]})]})})),vt=function(t){var e=t.demo,a=void 0!==e&&e,n=Object(k.c)((function(t){return t.todolists})),i=Object(k.c)((function(t){return t.tasks})),c=Object(k.c)((function(t){return t.auth.isLoggedIn})),r=Object(k.b)();Object(s.useEffect)((function(){!a&&c&&r((function(t){return t(J({status:"loading"})),A().then((function(e){t(J({status:"succeeded"})),t(X({todolists:e.data}))})).catch((function(e){z(e,t)}))}))}),[r]);var d=Object(s.useCallback)((function(t,e){var a=function(t,e){return function(a){a(J({status:"loading"})),E(t,e).then((function(t){0===t.data.resultCode?(a(J({status:"succeeded"})),a(st({task:t.data.data.item}))):N(t.data,a)})).catch((function(t){z(t,a)}))}}(e,t);r(a)}),[r]),l=Object(s.useCallback)((function(t,e){var a=function(t,e){return function(a){return P(t,e).then((function(){return a(ot({todolistId:t,taskId:e}))}))}}(t,e);r(a)}),[r]),j=Object(s.useCallback)((function(t,e,a){var n=dt(t,e,{status:a});r(n)}),[r]),b=Object(s.useCallback)((function(t,e,a){var n=dt(t,e,{title:a});r(n)}),[r]),f=Object(s.useCallback)((function(t){var e=function(t){return function(e){e(J({status:"loading"})),w(t).then((function(t){e(J({status:"succeeded"})),e(Q({todolist:t.data.data.item}))}))}}(t);r(e)}),[r]),p=Object(s.useCallback)((function(t){var e=function(t){return function(e){e(J({status:"loading"})),e(et({id:t,status:"loading"})),L(t).then((function(){e(J({status:"succeeded"})),e(Z({id:t}))}))}}(t);r(e)}),[r]),O=Object(s.useCallback)((function(t,e){var a=function(t,e){return function(a){S(t,e).then((function(){return a($({id:t,title:e}))}))}}(t,e);r(a)}),[r]),h=Object(s.useCallback)((function(t,e){var a=tt({id:e,filter:t});r(a)}),[r]);return c?Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)(lt.a,{container:!0,style:{padding:"20px"},children:Object(o.jsx)(pt,{addItem:f})}),Object(o.jsx)(lt.a,{container:!0,spacing:3,children:n.map((function(t){var e=i[t.id];return Object(o.jsx)(lt.a,{item:!0,children:Object(o.jsx)(ut.a,{style:{padding:"10px"},children:Object(o.jsx)(xt,{todolist:t,demo:a,tasks:e,removeTask:l,changeFilter:h,addTask:d,changeTaskStatus:j,removeTodolist:p,changeTaskTitle:b,changeTodolistTitle:O})})},t.id)}))})]}):Object(o.jsx)(u.a,{replace:!0,to:"/login"})},Ct=a(180),Tt=a(177);function It(t){return Object(o.jsx)(Tt.a,Object(x.a)({elevation:6,variant:"filled"},t))}var yt=function(){var t=Object(k.c)((function(t){return t.app.error})),e=Object(k.b)(),a=null!==t,n=function(t,a){"clickaway"!==a&&e(K({error:null}))};return Object(o.jsx)(Ct.a,{open:a,autoHideDuration:6e3,onClose:n,children:Object(o.jsx)(It,{onClose:n,severity:"error",children:t})})},At=a(64),wt=a.n(At),Lt=a(181),St=a(163),Ft=a(169),Pt=a(170),Et=a(85),_t=function(){var t=Object(k.b)(),e=Object(Et.a)({initialValues:{email:"",password:"",rememberMe:!1},validate:function(t){return t.email?t.password?void 0:{password:"Password is required"}:{email:"Email is required"}},onSubmit:function(e){var a;t((a=e,function(t){t(J({status:"loading"})),T(a).then((function(e){0===e.data.resultCode?(t(q({isLoggedIn:!0})),t(J({status:"succeeded"}))):N(e.data,t)})).catch((function(e){z(e,t)}))}))}});return Object(k.c)((function(t){return t.auth.isLoggedIn}))?Object(o.jsx)(u.a,{replace:!0,to:"/todolist"}):Object(o.jsx)(lt.a,{container:!0,justify:"center",children:Object(o.jsx)(lt.a,{item:!0,xs:4,children:Object(o.jsx)("form",{onSubmit:e.handleSubmit,children:Object(o.jsxs)(Lt.a,{children:[Object(o.jsxs)(St.a,{children:[Object(o.jsx)("p",{children:"Email: free@samuraijs.com"}),Object(o.jsx)("p",{children:"Password: free"})]}),Object(o.jsxs)(Ft.a,{children:[Object(o.jsx)(bt.a,Object(x.a)({label:"Email",margin:"normal"},e.getFieldProps("email"))),e.errors.email?Object(o.jsx)("div",{children:e.errors.email}):null,Object(o.jsx)(bt.a,Object(x.a)({type:"password",label:"Password",margin:"normal"},e.getFieldProps("password"))),e.errors.password?Object(o.jsx)("div",{children:e.errors.password}):null,Object(o.jsx)(Pt.a,{label:"Remember me",control:Object(o.jsx)(gt.a,Object(x.a)(Object(x.a)({},e.getFieldProps("rememberMe")),{},{checked:e.values.rememberMe}))}),Object(o.jsx)(h.a,{type:"submit",variant:"contained",color:"primary",children:"Login"})]})]})})})})},Nt=function(t){var e=t.demo,a=void 0!==e&&e,n=Object(k.c)((function(t){return t.app.status})),i=Object(k.c)((function(t){return t.app.isInitialized})),c=Object(k.c)((function(t){return t.auth.isLoggedIn})),r=Object(k.b)();Object(s.useEffect)((function(){r((function(t){y().then((function(e){0===e.data.resultCode&&t(q({isLoggedIn:!0}))})),t(Y({isInitialized:!0}))}))}),[]);var d=Object(s.useCallback)((function(){r((function(t){t(J({status:"loading"})),I().then((function(e){0===e.data.resultCode?(t(q({isLoggedIn:!1})),t(J({status:"succeeded"}))):N(e.data,t)})).catch((function(e){z(e,t)}))}))}),[r]);return i?Object(o.jsxs)(l.a,{children:[Object(o.jsxs)(b.a,{position:"relative",children:[Object(o.jsxs)(f.a,{children:[Object(o.jsx)(p.a,{edge:"start",color:"inherit","aria-label":"menu",children:Object(o.jsx)(g.a,{})}),Object(o.jsxs)("div",{className:wt.a.header,children:[Object(o.jsx)(O.a,{variant:"h6",children:"News"}),c&&Object(o.jsx)(h.a,{color:"inherit",onClick:d,children:"Log out"})]})]}),Object(o.jsx)(yt,{})]}),"loading"===n&&Object(o.jsx)("div",{className:wt.a.linearProgress,children:Object(o.jsx)(j.a,{color:"secondary"})}),Object(o.jsx)(m.a,{fixed:!0,children:Object(o.jsxs)(u.d,{children:[Object(o.jsx)(u.b,{path:"/todolist",element:Object(o.jsx)(vt,{demo:a})}),Object(o.jsx)(u.b,{path:"/login",element:Object(o.jsx)(_t,{})})]})})]}):Object(o.jsx)(j.a,{color:"secondary"})},zt=a(50),Dt=a(44),Mt=Object(zt.b)({tasks:nt,todolists:V,app:R,auth:B}),Bt=Object(D.a)({reducer:Mt,middleware:function(t){return t().prepend(Dt.a)}});window.store=Bt,d.a.render(Object(o.jsx)(k.a,{store:Bt,children:Object(o.jsx)(Nt,{})}),document.getElementById("root"))},64:function(t,e,a){t.exports={appBarWrapper:"App_appBarWrapper__1YaDO",linearProgress:"App_linearProgress__3BkLP",header:"App_header__3Yfkh"}}},[[127,1,2]]]);
//# sourceMappingURL=main.17e49a80.chunk.js.map