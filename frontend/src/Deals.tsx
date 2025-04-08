import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import ClearIcon from "@mui/icons-material/Clear";

type Deal = {
  id: number;
  account_id: number;
  start_date: string;
  end_date: string;
  value: number;
  status: string;
  account_name: string;
};

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({ status: "", year: "" });
  const [tempFilters, setTempFilters] = useState({ status: "", year: "" });
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setTempFilters(filters);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const query = new URLSearchParams({
          ...filters,
          orgId: "1",
        }).toString();
        const response = await fetch(
          `http://localhost:3000/api/deals?${query}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setDeals(data.deals);
        setTotalValue(data.totalValue);
      } catch (err: any) {
        setError(err.message || "Failed to fetch deals");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  const handleTempFilterChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setTempFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    setFilters(tempFilters);
    handleClose();
  };

  const handleClearFilters = () => {
    setFilters({ status: "", year: "" });
  };

  const years = Array.from({ length: 11 }, (_, i) => 2015 + i);

  if (loading)
    return (
      <Box sx={{ p: 6 }}>
        <CircularProgress />
      </Box>
    );
  if (error)
    return (
      <Box sx={{ p: 6 }}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );

  return (
    <Box sx={{ p: 6 }}>
      <Typography variant="h3" sx={{ mb: 2 }}>
        Organization 1
      </Typography>

      {/* Filter Controls */}
      <Box sx={{ mb: 4, display: "flex", gap: 2 }}>
        {/* Filters Button */}
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          onClick={handleOpen}
        >
          Filters
        </Button>

        {/* Clear Filters Button */}
        <Button
          variant="outlined"
          startIcon={<ClearIcon />}
          onClick={handleClearFilters}
          disabled={!filters.status && !filters.year}
        >
          Clear Filters
        </Button>
      </Box>

      {/* Filters Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Filters</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              p: 2,
              minWidth: 300,
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="status-filter">Status</InputLabel>
              <Select
                labelId="status-filter"
                name="status"
                value={tempFilters.status}
                label="Status"
                onChange={handleTempFilterChange}
              >
                <MenuItem value="">All Statuses</MenuItem>
                <MenuItem value="open">Open</MenuItem>
                <MenuItem value="closed">Closed</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="year-filter">Year</InputLabel>
              <Select
                labelId="year-filter"
                name="year"
                value={tempFilters.year}
                label="Year"
                onChange={handleTempFilterChange}
              >
                <MenuItem value="">All Years</MenuItem>
                {years.map((year) => (
                  <MenuItem key={year} value={year.toString()}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleApplyFilters} variant="contained">
            Apply
          </Button>
        </DialogActions>
      </Dialog>

      <Typography variant="body1" sx={{ mb: 4, fontWeight: "bold" }}>
        Total Value: ${totalValue.toLocaleString("en-US")}
      </Typography>

      {deals.length === 0 ? (
        <Typography variant="body1" sx={{ p: 6, color: "text.secondary" }}>
          No deals match the current filters
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "grey.100" }}>
              <TableRow>
                <TableCell>Account</TableCell>
                <TableCell>Start</TableCell>
                <TableCell>End</TableCell>
                <TableCell>Value</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deals.map((deal) => (
                <TableRow key={deal.id}>
                  <TableCell>{deal.account_name}</TableCell>
                  <TableCell>
                    {new Date(deal.start_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(deal.end_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>${deal.value.toLocaleString("en-US")}</TableCell>
                  <TableCell>
                    <Chip
                      label={deal.status}
                      color={
                        deal.status === "open"
                          ? "success"
                          : deal.status === "closed"
                          ? "primary"
                          : "warning"
                      }
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
