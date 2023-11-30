/**
 * desc: 404错误页面
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/7/30
 * Time: 下午6:12
 */
import React from 'react';

class Err404 extends React.Component{
    render(){
        const style = {
            position: "fixed",
            top:0,
            left: 0,
            right: 0,
            bottom:0,
            background: "#fff",
            textAlign: 'center',
            paddingTop: 200
        };
        return(
            <div style={style}>404</div>
        )
    }
}

export {Err404}