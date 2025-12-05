// src/components/global/DashboardHeader.jsx
import React from "react";
import { Box, Typography, Button, Avatar, Chip, Divider } from "@mui/material";
import { LogOut } from "lucide-react";
import ContentCard from "./ContentCard";

const DashboardHeader = ({
  avatarSrc,
  avatarIcon,
  avatarBgColor = "#2e7d32",
  title,
  subtitle,
  email,
  chips = [],
  additionalInfo = [],
  onLogout,
  children,
}) => {
  return (
    <ContentCard>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
          {avatarSrc ? (
            <Avatar src={avatarSrc} sx={{ width: 100, height: 100, mr: 3 }} />
          ) : (
            <Avatar
              sx={{
                width: 100,
                height: 100,
                bgcolor: avatarBgColor,
                fontSize: "2.5rem",
                mr: 3,
              }}
            >
              {avatarIcon}
            </Avatar>
          )}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {subtitle}
              </Typography>
            )}
            {chips.length > 0 && (
              <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                {chips.map((chip, index) => (
                  <Chip key={index} {...chip} size="small" />
                ))}
              </Box>
            )}
            {email && (
              <Typography variant="body2" color="text.secondary">
                {email}
              </Typography>
            )}
            {additionalInfo.map((info, index) => (
              <Typography
                key={index}
                variant="body2"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}
              >
                {info}
              </Typography>
            ))}
          </Box>
        </Box>
        {onLogout && (
          <Button
            variant="outlined"
            color="error"
            startIcon={<LogOut size={20} />}
            onClick={onLogout}
          >
            Logout
          </Button>
        )}
      </Box>
      {children && (
        <>
          <Divider sx={{ my: 3 }} />
          {children}
        </>
      )}
    </ContentCard>
  );
};

export default DashboardHeader;
