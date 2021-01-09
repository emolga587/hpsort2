import React from "react";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Box } from "@material-ui/core";

interface Props {
    name: string;
    rank: string;
}

interface State { }

export default class ResultPicture extends React.Component<Props, State> {
    render() {
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
                        image={`member_pics/${this.props.name}.jpg`}
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