import{r as o,u as h,j as s}from"./index-ZTq6eiU5.js";import{a as u,s as c}from"./Toasthelper-DivTIe87.js";import{u as p}from"./module-B4iGLeR6.js";import{S as g,a as f}from"./config-BHbr7qld.js";import"./react-toastify.esm-vcybVMYN.js";function y(){const[i,d]=o.useState([]),n=h();async function l(){try{const e=p.getCookieValue("adminAuthToken"),t=`${f}show-all-user`,m=await u.get(t,{headers:{Authorization:e?`Bearer ${e}`:""}}),{error:r,message:a,result:x}=m.data;r&&a==="SignIn"?n("/user-login"):r?c(a):d(x)}catch(e){c(e.message)}}return o.useEffect(()=>{l()},[]),s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"container my-5",children:[s.jsx("h2",{className:"text-center mb-4",children:"User List"}),s.jsx("div",{className:"row",children:i.map((e,t)=>s.jsx("div",{className:"col-md-6 col-lg-4 mb-4",children:s.jsxs("div",{className:"custom-card shadow",children:[s.jsx("div",{className:"custom-card-header",children:s.jsx("img",{src:`${g}${e.photo}`,alt:e.fullName,className:"custom-card-img"})}),s.jsxs("div",{className:"custom-card-body",children:[s.jsx("h5",{className:"custom-card-title",children:e.fullName}),s.jsxs("p",{className:"custom-card-text",children:[s.jsx("strong",{children:"Email:"})," ",e.email," ",s.jsx("br",{}),s.jsx("strong",{children:"Mobile:"})," ",e.mobile," ",s.jsx("br",{}),s.jsx("strong",{children:"Address:"})," ",e.address]})]})]})},t))})]}),s.jsx("style",{children:`
          .custom-card {
            background-color: #f9f9f9;
            border: 1px solid #e0e0e0;
            border-radius: 12px;
            overflow: hidden;
            transition: all 0.3s ease-in-out;
          }

          .custom-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
          }

          .custom-card-header {
            background-color: #e0f7fa;
            padding: 0;
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
            font-size: 20px;
            font-weight: 600;
            color: #193e40;
            margin-bottom: 10px;
          }

          .custom-card-text {
            font-size: 14px;
            color: #555;
            line-height: 1.6;
          }

          @media (max-width: 768px) {
            .custom-card-img {
              height: 150px;
            }

            .custom-card-title {
              font-size: 18px;
            }

            .custom-card-text {
              font-size: 13px;
            }
          }
        `})]})}export{y as default};
