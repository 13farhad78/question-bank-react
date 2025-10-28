import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button, Box, Typography } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ShortTextIcon from "@mui/icons-material/ShortText";

export default function ReadingQuestionsMenu({ onQuestionSelect }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // تابع جدیدی برای مدیریت انتخاب آیتم
    const handleItemClick = (questionType) => {
        // 1. فراخوانی تابع پاس داده شده از کامپوننت پدر
        onQuestionSelect(questionType);
        // 2. بستن منو
        handleClose();
    };

    const menuItems = [
        {
            type: "multi_choice",
            label: "Multiple Choice",
            icon: <FormatListBulletedIcon fontSize="small" />,
            color: "#1976d2",
        },
        {
            type: "true_false",
            label: "True / False",
            icon: <CheckBoxIcon fontSize="small" />,
            color: "#2e7d32",
        },
        {
            type: "short_answer",
            label: "Short Answer",
            icon: <ShortTextIcon fontSize="small" />,
            color: "#ed6c02",
        },
    ];
    return (
        <>
            <Button
                startIcon={<AddIcon />}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                variant="outlined"
                sx={{ mt: 2 }}
                size="small">
                add question
            </Button>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        mt: 1,
                        borderRadius: 2,
                        minWidth: 200,
                        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    },
                }}>
                {menuItems.map((item) => (
                    <MenuItem
                        key={item.type}
                        onClick={() => handleItemClick(item.type)}
                        sx={{
                            py: 1.5,
                            "&:hover": {
                                backgroundColor: `${item.color}10`,
                            },
                        }}>
                        <Box className="flex items-center space-x-2">
                            <Box sx={{ color: item.color }}>{item.icon}</Box>
                            <Typography
                                variant="body2"
                                sx={{ fontWeight: 500 }}>
                                {item.label}
                            </Typography>
                        </Box>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}
