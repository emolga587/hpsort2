import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Box, GridSize } from "@material-ui/core";
import hpDB from "../modules/HPDatabase";

interface Props {
    name: string;
    rank: number;
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
            media: {
                width: 96,
                height: 80,
                zoom: 1
            }
        };

        let name_font_size = 14;
        let card_width: GridSize = 4;

        if (this.props.rank === 1) {
            styles.media.width *= 3;
            styles.media.height *= 3;
            name_font_size += 2;
            card_width = 12;
        } else if (this.props.rank <= 3) {

            styles.media.width *= 3 / 2;
            styles.media.height *= 3 / 2;
            name_font_size += 1;
            card_width = 6;
        } else if (this.props.rank >= 7) {
            styles.media.width *= 8 / 9;
            name_font_size -= 2;
            card_width = 3;
        }

        return (
            <Grid container item xs={card_width} justifyContent="center">
                <Box m={0.5}>
                    <Card>
                        <CardMedia
                            component="img"
                            alt={this.props.name}
                            image={`${img_dir}${this.props.name}.jpg`}
                            title="Contemplative Reptile"
                            style={styles.media}
                        />
                        <CardContent style={{ paddingTop: 8, paddingBottom: 8, paddingLeft: 5, paddingRight: 5, textAlign: "center" }}>
                            <Typography component="p" style={{ fontSize: name_font_size }}>
                                {this.props.rank}位
                            </Typography>
                            <Typography component="p" style={{ fontSize: name_font_size }}>
                                {this.props.name}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Grid>
        );
    }
}