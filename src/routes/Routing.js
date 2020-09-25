import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { map } from "lodash";
import configRouting from "./configRouting";

export default function Routing(props) {
    const {setRefreshChckLogin} = props;

    return (
        <Router>
            <Switch>
                {map(configRouting, (route, index) => (
                    <Route key={index} path={route.path} exact={route.exact}>
                        <route.page setRefreshChckLogin={setRefreshChckLogin} />
                    </Route>
                ))}
            </Switch>
        </Router>
    );
}
