/**
 * desc:
 * User: Renjian.Tang/trj8772@aliyun.com
 * Date: 2018/8/14
 * Time: 下午2:57
 */
import React from 'react';
//
// const loadForm = () => {
//     return function(WrappedComponent){
//         class SearchForm extends React.Component<any> {
//             input:any;
//             render(){
//                 return(
//                     <WrappedComponent ref={(ref:any) => this.input = ref} {...this.props}/>
//                 )
//             }
//         }
//         return SearchForm;
//     }
// };
//
// export default loadForm;



const loadForm = (WrappedComponent) => (
    class extends React.Component<any> {
        input:any;
        render(){
            return(
                <WrappedComponent book={`222`} {...this.props}/>
            )
        }
    }
)
export default loadForm;