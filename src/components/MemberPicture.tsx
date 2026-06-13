import React from "react";

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import hpDB from "../modules/HPDatabase";

interface Props {
    name: string;
    onClick?: any;
}

interface State { }

export default class MemberPicture extends React.Component<Props, State> {
    render() {
        const styles =
        {
            card: {
                maxWidth: 345,
            },
            media: {
                height: "300px"
            }
        };

        let img_dir: string;
        if (Number(hpDB.memberName2ID(this.props.name)) < 9000) {
            img_dir = "member_pics/";
        } else {
            img_dir = "extra_pics/";
        }

        return (
            <Card onClick={this.props.onClick} style={styles.card}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt={this.props.name}
                        image={`${img_dir}${this.props.name}.webp`}
                        title="Contemplative Reptile"
                        style={styles.media}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h2">
                            {this.props.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" component="p">
                            {hpDB.groupNameByMemberName(this.props.name)}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }
}
