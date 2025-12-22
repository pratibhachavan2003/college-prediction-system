import React from 'react';
import { Grid, Card, CardActionArea, CardContent, Typography } from '@mui/material';

const courses = [
  { key: 'BTECH', label: 'B. Tech' },
  { key: 'MBA', label: 'MBA' },
  { key: 'MEDICAL', label: 'Medical' },
  { key: 'MTECH', label: 'M. Tech' },
  { key: 'DESIGN', label: 'Design' },
  { key: 'LAW', label: 'Law' },
];

const CourseSelector = ({ selected, onSelect }) => {
  return (
    <Grid container spacing={2}>
      {courses.map((c) => (
        <Grid item xs={6} sm={4} md={2} key={c.key}>
          <Card elevation={3} sx={{ borderRadius: 2 }}>
            <CardActionArea onClick={() => onSelect(c.key)}>
              <CardContent sx={{ py: 3, textAlign: 'center' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: selected === c.key ? 700 : 600 }}>
                  {c.label}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CourseSelector;
