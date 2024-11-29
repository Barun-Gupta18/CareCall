import{r as m,u as N,j as s}from"./index-ZTq6eiU5.js";import{a as f,s as n,b as I}from"./Toasthelper-DivTIe87.js";import{u as p}from"./module-B4iGLeR6.js";import{S as j}from"./config-CfSJMknN.js";import{S as $}from"./config-BHbr7qld.js";import"./react-toastify.esm-vcybVMYN.js";function P(){const[w,l]=m.useState([]),[x,g]=m.useState(!1),h=N();async function b(){try{const t=p.getCookieValue("adminAuthToken"),e=`${j}show-all-partner`,r=await f.get(e,{headers:{Authorization:t?`Bearer ${t}`:""}}),{error:o,message:a,result:c}=r.data;o&&a==="SignIn"?h("/admin-login"):o?n(a):l(c)}catch(t){n(t.message)}}const y=async(t,e)=>{g(!0);try{const r=p.getCookieValue("adminAuthToken"),o=e==="active"?"In-active":"active",a=`${j}admin-status-update/${t}`,c={status:o},S=await f.put(a,c,{headers:{Authorization:r?`Bearer ${r}`:""}}),{error:u,message:i}=S.data;u&&i==="SignIn"?h("/admin-login"):u?n(i):(I(i),l(k=>k.map(d=>d._id===t?{...d,status:o}:d)),b())}catch(r){n(r.message)}finally{g(!1)}};return m.useEffect(()=>{b()},[]),s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"container my-5",children:[s.jsx("h2",{className:"text-center mb-4",children:"Service Provider View"}),s.jsx("div",{className:"row",children:w.map((t,e)=>s.jsx("div",{className:"col-md-6 col-lg-4 mb-4",children:s.jsxs("div",{className:"custom-card shadow-sm",children:[s.jsx("img",{src:`${$}${t.photo}`,alt:t.fullname,className:"custom-card-img"}),s.jsxs("div",{className:"custom-card-body",children:[s.jsx("h5",{className:"custom-card-title",children:t.fullname}),s.jsxs("p",{className:"custom-card-text",children:[s.jsx("strong",{children:"Email:"})," ",t.email," ",s.jsx("br",{}),s.jsx("strong",{children:"Mobile:"})," ",t.mobile," ",s.jsx("br",{}),s.jsx("strong",{children:"Category:"})," ",t.categoryInfo," ",s.jsx("br",{}),s.jsx("strong",{children:"Sub-category:"})," ",t.subcategoryInfo," ",s.jsx("br",{}),s.jsx("strong",{children:"State:"})," ",t.stateInfo," ",s.jsx("br",{}),s.jsx("strong",{children:"City:"})," ",t.cityInfo," ",s.jsx("br",{}),s.jsx("strong",{children:"Address:"})," ",t.address," ",s.jsx("br",{}),s.jsx("strong",{children:"Price:"})," ₹",t.price," ",s.jsx("br",{}),s.jsx("strong",{children:"Start Time:"})," ",t.starttime," ",s.jsx("br",{}),s.jsx("strong",{children:"End Time:"})," ",t.endtime]}),s.jsx("button",{onClick:()=>y(t._id,t.status),disabled:x,className:`btn btn-block ${t.status==="active"?"btn-success":"btn-danger"}`,children:x?"Updating...":t.status==="In-active"?"Activate":"Deactivate"})]})]})},e))})]}),s.jsx("style",{children:`
          .custom-card {
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 12px;
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .custom-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
          }

          .custom-card-img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-bottom: 1px solid #ddd;
          }

          .custom-card-body {
            padding: 15px;
          }

          .custom-card-title {
            font-size: 18px;
            font-weight: 600;
            color: #193e40;
            margin-bottom: 10px;
          }

          .custom-card-text {
            font-size: 14px;
            color: #555;
            line-height: 1.6;
          }

          .btn {
            display: block;
            width: 100%;
            padding: 10px 0;
            font-size: 14px;
            font-weight: 600;
            text-align: center;
            border-radius: 8px;
            transition: background-color 0.3s ease, transform 0.3s ease;
          }

          .btn-success {
            background-color: #27ae60;
            color: #fff;
          }

          .btn-success:hover {
            background-color: #219150;
            transform: scale(1.02);
          }

          .btn-danger {
            background-color: #e74c3c;
            color: #fff;
          }

          .btn-danger:hover {
            background-color: #c0392b;
            transform: scale(1.02);
          }

          @media (max-width: 768px) {
            .custom-card-img {
              height: 150px;
            }

            .custom-card-title {
              font-size: 16px;
            }

            .custom-card-text {
              font-size: 13px;
            }
          }
        `})]})}export{P as default};
