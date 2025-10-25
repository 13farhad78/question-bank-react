import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

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
                // MenuListProps={{
                //     "aria-labelledby": "basic-button",
                // }}
            >
                <MenuItem onClick={() => handleItemClick("multi_choice")}>
                    multiple-choice
                </MenuItem>
                <MenuItem onClick={() => handleItemClick("true_false")}>
                    true/false
                </MenuItem>
                <MenuItem onClick={() => handleItemClick("short_answer")}>
                    short answer
                </MenuItem>
                <MenuItem onClick={() => handleItemClick("full_answer")}>
                    full answer
                </MenuItem>
            </Menu>
        </>
    );
}
