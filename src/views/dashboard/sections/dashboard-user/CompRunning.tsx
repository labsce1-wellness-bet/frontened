import React, { useState, useContext } from "react";
import { CompRunningWrapper } from "./CompRunningStyles";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Card from "@material-ui/core/Card";
import { BeforeStart } from "./BeforeStart";
import {
  VictoryChart,
  VictoryArea,
  VictoryGroup,
  VictoryLabel,
  VictoryPie,
} from "victory";
import moment from "moment";
import { UserContext } from "GlobalContext/UserContext";
import { CardHeader, CardContent, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  appBar: {
    top: "auto",
    bottom: 0,
  },
}));

interface Props {
  group: any;
}
const CompRunning: React.FC<Props> = props => {
  const state = useContext(UserContext);
  const group = props.group;
  const classes = useStyles();
  const RANKINGS = "RANKINGS";
  const STATS = "STATS";
  const INFO = "INFO";
  const [tabNum, setTabNum] = useState(0);
  group.members.sort((a: any, b: any) =>
    a.progress > b.progress ? -1 : b.progress > a.progress ? 1 : 0,
  );
  const graphColorSelf = "green";
  const graphColors = [
    "cyan",
    "magenta",
    "yellow",
    "orange",
    "purple",
    "aquamarine",
    "chocolate",
    "crimson",
    "darkblue",
    "black",
  ];
  const self = group.members.find(
    (member: { fname: string }) => member.fname === state.fname,
  );
  const startDate = moment(group.startDate, "M/DD/YYYY");
  const endDate = moment(group.endDate, "M/DD/YYYY");
  const today = moment(moment().format("M/DD/YYYY"), "M/DD/YYYY");
  const daysLeft = endDate.diff(today, "days") + 1;
  const daysPast = today.diff(startDate, "days");
  return (
    <CompRunningWrapper>
      <div className="desktop-view">
        <div className="header">
          <div className="header-left">
            <Typography variant="h4" color="primary">
              {group.groupName}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              {`Competition Ends ${group.endDate}`}
            </Typography>
          </div>
          <Typography variant="h4" color="primary">
            {`Total Pot: $${group.potTotal}`}
          </Typography>
        </div>
        <div className="three-cards">
          <Card
            className="card rankings"
            style={{ maxHeight: 350, overflow: "auto" }}>
            <CardHeader title="Rankings"></CardHeader>
            <CardContent>
              <List>
                {group.members.map((member: any, index: number) => {
                  return (
                    <div key={index}>
                      <ListItem className="ranking">
                        <ListItemText>{`${index + 1}. ${member.fname} ${
                          member.lname
                        }`}</ListItemText>
                        <ListItemText className="ranking-hrs">{`${member.progress} Hrs`}</ListItemText>
                      </ListItem>
                      <Divider></Divider>
                    </div>
                  );
                })}
              </List>
            </CardContent>
          </Card>
          <Card className="card time">
            <CardHeader title="Time Left"></CardHeader>

            <CardContent>
              <svg viewBox="0 0 400 400">
                <VictoryPie
                  standalone={false}
                  width={400}
                  height={400}
                  data={[
                    { label: "", y: daysPast },
                    { label: "", y: daysLeft },
                  ]}
                  colorScale={"blue"}
                  innerRadius={100}
                  labels={() => ""}
                />
                <VictoryLabel
                  textAnchor="middle"
                  style={{ fontSize: 40, fill: "#3f51b5" }}
                  x={200}
                  y={200}
                  text={`${daysLeft} ` + (daysLeft === 1 ? "day" : "days")}
                />
              </svg>
            </CardContent>
          </Card>

          <Card className="card my-stats">
            <CardHeader title="My Stats"></CardHeader>
            <CardContent style={{ paddingLeft: "50px" }}>
              <Typography variant="h6" color="primary">
                Today
              </Typography>
              <Typography variant="h3" color="primary">{`${self.last_five[4] -
                self.last_five[3]} hrs`}</Typography>
              <Typography variant="h6" color="primary">
                Total
              </Typography>
              <Typography
                variant="h3"
                color="primary">{`${self.last_five[4]} hrs`}</Typography>
            </CardContent>
          </Card>
        </div>
        <Card className="card comp-stats">
          <CardHeader title="Competition Statistics"></CardHeader>
          <CardContent>
            <VictoryChart width={1000} height={280}>
              <VictoryGroup
                style={{ data: { strokeWidth: 3, fillOpacity: 0.2 } }}
                colorScale={graphColors}>
                {group.members.map((member: any, index: number) => {
                  return (
                    <VictoryArea
                      key={index}
                      style={{
                        data:
                          member.fname === state.fname
                            ? {
                                fill: graphColorSelf,
                                stroke: graphColorSelf,
                              }
                            : {},
                      }}
                      data={[
                        {
                          x: moment()
                            .subtract(5, "days")
                            .format("M/DD/YYYY"),
                          y: member.last_five[0],
                        },
                        {
                          x: moment()
                            .subtract(4, "days")
                            .format("M/DD/YYYY"),
                          y: member.last_five[1],
                        },
                        {
                          x: moment()
                            .subtract(3, "days")
                            .format("M/DD/YYYY"),
                          y: member.last_five[2],
                        },
                        {
                          x: moment()
                            .subtract(2, "days")
                            .format("M/DD/YYYY"),
                          y: member.last_five[3],
                        },
                        {
                          x: moment()
                            .subtract(1, "days")
                            .format("M/DD/YYYY"),
                          y: member.last_five[4],
                        },
                      ]}
                    />
                  );
                })}
              </VictoryGroup>
            </VictoryChart>
          </CardContent>
        </Card>
      </div>
      <div className="mobile-tabs">
        <AppBar
          position="sticky"
          color="default"
          className={`${classes.appBar} appBar`}>
          <Tabs
            value={tabNum}
            onChange={(e: any, index: number) => setTabNum(index)}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth">
            <Tab label={RANKINGS} />
            <Tab label={STATS} />
            <Tab label={INFO} />
          </Tabs>
        </AppBar>
        {tabNum === 0 && (
          <div>
            <List>
              {group.members.map((member: any, index: number) => {
                return (
                  <div key={index}>
                    <ListItem className="ranking">
                      <ListItemText>{`${index + 1}. ${member.fname} ${
                        member.lname
                      }`}</ListItemText>
                      <ListItemText className="ranking-hrs">{`${member.progress} Hrs`}</ListItemText>
                    </ListItem>
                    <Divider></Divider>
                  </div>
                );
              })}
            </List>
          </div>
        )}
        {tabNum === 1 && (
          <div className="mobile-graphs">
            <VictoryChart width={400} height={400}>
              <VictoryLabel
                style={{ fontSize: 20 }}
                x={200}
                y={20}
                text="My Progress"
                textAnchor="middle"
              />
              <VictoryGroup
                style={{ data: { strokeWidth: 3, fillOpacity: 0.2 } }}>
                <VictoryArea
                  style={{
                    data: {
                      fill: graphColorSelf,
                      stroke: graphColorSelf,
                    },
                  }}
                  data={[
                    {
                      x: moment()
                        .subtract(5, "days")
                        .format("M/DD/YYYY"),
                      y: self.last_five[0],
                    },
                    {
                      x: moment()
                        .subtract(4, "days")
                        .format("M/DD/YYYY"),
                      y: self.last_five[1],
                    },
                    {
                      x: moment()
                        .subtract(3, "days")
                        .format("M/DD/YYYY"),
                      y: self.last_five[2],
                    },
                    {
                      x: moment()
                        .subtract(2, "days")
                        .format("M/DD/YYYY"),
                      y: self.last_five[3],
                    },
                    {
                      x: moment()
                        .subtract(1, "days")
                        .format("M/DD/YYYY"),
                      y: self.last_five[4],
                    },
                  ]}
                />
              </VictoryGroup>
            </VictoryChart>
            <VictoryChart width={400} height={400}>
              <VictoryLabel
                style={{ fontSize: 20 }}
                x={200}
                y={20}
                text="Everyone"
                textAnchor="middle"
              />
              <VictoryGroup
                style={{ data: { strokeWidth: 3, fillOpacity: 0.2 } }}
                colorScale={graphColors}>
                {group.members.map((member: any, index: number) => {
                  return (
                    <VictoryArea
                      key={index}
                      style={{
                        data:
                          member.fname === state.fname
                            ? {
                                fill: graphColorSelf,
                                stroke: graphColorSelf,
                              }
                            : {},
                      }}
                      data={[
                        {
                          x: moment()
                            .subtract(5, "days")
                            .format("M/DD/YYYY"),
                          y: member.last_five[0],
                        },
                        {
                          x: moment()
                            .subtract(4, "days")
                            .format("M/DD/YYYY"),
                          y: member.last_five[1],
                        },
                        {
                          x: moment()
                            .subtract(3, "days")
                            .format("M/DD/YYYY"),
                          y: member.last_five[2],
                        },
                        {
                          x: moment()
                            .subtract(2, "days")
                            .format("M/DD/YYYY"),
                          y: member.last_five[3],
                        },
                        {
                          x: moment()
                            .subtract(1, "days")
                            .format("M/DD/YYYY"),
                          y: member.last_five[4],
                        },
                      ]}
                    />
                  );
                })}
              </VictoryGroup>
            </VictoryChart>
          </div>
        )}
        {tabNum === 2 && <BeforeStart group={group}></BeforeStart>}
      </div>
    </CompRunningWrapper>
  );
};

export { CompRunning };