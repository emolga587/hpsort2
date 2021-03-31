import React from "react";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Box } from "@material-ui/core";
import hpDB from "../modules/HPDatabase";

interface Props {
    name: string;
    rank: string;
}

interface State { }

export default class ResultPicture extends React.Component<Props, State> {
    render() {
        let img_dir: string;
        if (Number(hpDB.memberName2ID(this.props.name)) < 9000) {
            img_dir = "member_pics/";
        } else {
            img_dir = "extra_pics/";
        }

        const styles =
        {
            card: {
                maxWidth: 150,
            },
            media: {
                width: 150,
                height: 120,
                zoom: 1
            }
        };
        return (
            <Box m={1}>
                <Card style={styles.card}>
                    <CardMedia
                        component="img"
                        alt={this.props.name}
                        image={`${img_dir}${this.props.name}.jpg`}
                        title="Contemplative Reptile"
                        style={styles.media}
                    />
                    <CardContent style={{paddingTop: 10, paddingBottom: 10, textAlign: "center"}}>
                        <Typography component="p" style={{fontSize: 15}}>
                            {this.props.rank}
                        </Typography>
                        <Typography component="p" style={{fontSize: 16}}>
                            {this.props.name}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        );
    }
}