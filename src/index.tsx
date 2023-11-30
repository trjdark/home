/**
 * desc: 入口文件
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/7/26
 * Time: 下午3:28
 */
/// <reference path="./.h/global.d.ts" />

import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {Provider} from 'react-redux';
import {store} from './saga/store';
import {Routers} from "./router/routers";
import 'moment/locale/zh-cn';

ReactDOM.render(
    <LocaleProvider locale={zhCN}>
        <Provider store={store}>
            <Routers/>
        </Provider>
    </LocaleProvider>,
    document.getElementById("react-container"));
