# Test Scenarios - Power Quality Monitor (PQM)

This document outlines the functional test scenarios for the Power Quality Monitoring application, covering the Onboarding, Dashboard, Devices, Events, and Alarms modules.

---

## 1. Onboarding & Release Announcements Modal

### TS-ONBD-01: "What's New" Modal Appearance & Dismissal
* **Description:** Verify that the "What's New" feature modal appears automatically upon fresh login following a version update (Version 2.4.0) and can be cleanly dismissed.
* **Pre-conditions:**
  * User logs in (or logs in after an app update to newer Version).
* **Test Steps:**
  1. Complete login authentication and observe the landing page (Dashboard).
  2. Verify modal title, version badge ("Version 2.4.0"), release note content features, and primary action button ("GOT IT").
  3. Click the **"GOT IT"** button.
* **Expected Result:**
  1. Background blurs/dims the main dashboard, displaying the modal centered on screen.
  2. Modal shows the version notes (e.g., Harmonic analysis, Bulk alarm acknowledgement, Automatic sign-out).
  3. On click, the modal unmounts immediately, restoring interactive access to the underlying Dashboard view.

---

## 2. Dashboard Module

### TS-DASH-01: Real-Time Data Polling
* **Description:** Verify that real-time telemetry graphs and KPI counters refresh automatically without requiring a full manual page reload.
* **Pre-conditions:** User is logged in and viewing the **Dashboard** tab.
* **Test Steps:**
  1. Observe the "Live voltage" 3-phase line graph and timestamp indicator.
  2. Wait for the designated polling interval (e.g., 60 seconds).
* **Expected Result:** Incoming telemetry data points append smoothly to the chart, and the timestamp updates to reflect the latest poll time.

### TS-DASH-02: KPI Card Aggregation Accuracy
* **Description:** Verify that data on the top KPI tiles match the underlying backend records.
* **Pre-conditions:** User is on the **Dashboard** tab.
* **Test Steps:**
  1. Note the counts displayed on *Total Devices*, *Active Alarms*, *Devices Out of Spec*, and *Offline Devices*.
  2. Query the backend API or compare against the Devices list tab.
* **Expected Result:** The aggregate numbers must match precisely with API response data `/api/dashboard/summary`. "Devices Out of Spec" must dynamically reflect devices having at least one active alarm.

### TS-DASH-03: Live Voltage graph
* **Description:** Verify that hovering mouse on different points in graph shows the respective timestamp data.
* **Pre-conditions:** User is on the **Dashboard** tab.
* **Test Steps:**
  1. Hover the mouse on line graph for different timestamps.
  2. Observe the voltage values shown for all three phases with the time stamp.
  3. Verify the respective live voltage values with response data from API call `/api/dashboard/live`.
* **Expected Result:**
  1. Hovering the mouse shows the respective time stamp's voltage data for all 3 phases.
  2. Voltage values are shown for all three phases along with the time stamp.
  3. API response data matches with the live data shown on line graph.

### TS-DASH-04: Recent Alarms Side panel
* **Description:** Verify that clicking an item in the *Recent alarms* side panel navigates to respective device readings page.
* **Pre-conditions:**
  * Active alarms are listed on the Dashboard side panel.
* **Test Steps:**
  1. Observe the alarm status for the respective item to be clicked.
  2. Click on a specific alarm item (e.g., `PNL-05 Lab Power`).
  3. Observe the status along with header for the device readings page.
* **Expected Result:**
  1. The alarm status is shown for each item in the side panel.
  2. The application navigates to the target device detailed readings page.
  3. The status shown on device page header is similar to status shown on Dashboard side panel for the respective device alarm.

### TS-DASH-05: Recent Alarms 'View All'
* **Description:** Verify that clicking on 'VIEW ALL' button navigates to Alarms page.
* **Pre-conditions:**
  * Active alarms are listed on the Dashboard side panel.
* **Test Steps:**
  1. Observe the listed 5 alarm status for the linked devices.
  2. Click on the 'VIEW ALL' button shown on side panel.
  3. Verify the page shown and observe the severity for the first 5 items listed.
* **Expected Result:**
  1. 5 recent alarms are listed with their status.
  2. On click, the application navigates to the alarms history page.
  3. Severity for first 5 items is similar to alarm severity shown on Dashboard side panel.

### TS-DASH-06: Live Voltage graph - Empty state
* **Description:** Verify that the Live voltage graph shows a proper empty state message when no live readings are available.
* **Pre-conditions:**
  * User is on the **Dashboard** tab.
  * API `/api/dashboard/live` returns no readings (stubbed via `cy.intercept` in automation).
* **Test Steps:**
  1. Load the Dashboard with an empty live readings response.
  2. Observe the Live voltage graph section.
* **Expected Result:**
  1. The Dashboard loads without errors.
  2. The graph section shows the message "No readings in the last 60 minutes." No broken chart, console error or empty axes are shown.

### TS-DASH-07: Live Voltage graph - Device selection
* **Description:** Verify that the Live voltage graph shows live data for the relevant device and is not fixed to a single device (Ref: Bug 3).
* **Pre-conditions:** User is on the **Dashboard** tab with multiple devices reporting.
* **Test Steps:**
  1. Observe the device name shown for the Live voltage graph.
  2. Observe the option for selecting different devices for the Live voltage graph.
* **Expected Result:**
  1. The graph is not always showing data only for `PAlarm` device.
  2. Option should be present to select different devices.

---

## 3. Devices tab

### TS-DEV-01: All Devices list page
* **Description:** Verify that the page shows all the available devices.
* **Pre-conditions:** User has navigated to the **Devices** tab.
* **Test Steps:**
  1. Observe the page to show search fields and table with all devices list.
  2. Click on the different column headers to sort the table data.
* **Expected Result:**
  1. Search fields, table for all devices list with column sorting functionality and proper pagination is shown.
  2. Clicking on respective column sorts the data accordingly.

### TS-DEV-02: Search & Filter Functionality
* **Description:** Verify that users can filter the device inventory list using search terms and status dropdowns.
* **Pre-conditions:** User has navigated to the **Devices** tab.
* **Test Steps:**
  1. Type a device identifier (e.g., `CAP-18`) into the search input.
  2. Clear search and select `Warning` from the **Status** filter dropdown.
* **Expected Result:**
  1. The device list dynamically displays matching rows (e.g., `CAP-18 Capacitor Bank`).
  2. The table isolates records flagged with `Warning` status and updates pagination accordingly.

### TS-DEV-03: Search with no matching results
* **Description:** Verify the empty state when search / filter returns no matching devices.
* **Pre-conditions:** User has navigated to the **Devices** tab.
* **Test Steps:**
  1. Type a non-existing value (e.g., `XYZ-999`) into the search input.
* **Expected Result:** Table shows the message "No devices match your filters" with hint "Try clearing the search box or selecting a different status."

### TS-DEV-04: Search by device name and location
* **Description:** Verify that the search field matches both device name and location ("Name or location").
* **Pre-conditions:** User has navigated to the **Devices** tab.
* **Test Steps:**
  1. Type a partial device name (e.g., `CAP`) into the search input.
  2. Clear search and type a location value of any listed device.
  3. Repeat the search with different letter case (e.g., `cap`).
* **Expected Result:**
  1. Only devices whose name matches the search term are listed.
  2. Only devices whose location matches the search term are listed.
  3. Search is case-insensitive and shows the same results.

### TS-DEV-05: Device detailed readings page
* **Description:** Verify that clicking on a device list item opens a detailed reading page.
* **Pre-conditions:** User is viewing the devices list page.
* **Test Steps:**
  1. Click on any specific device item row.
  2. Observe the page it navigates to.
* **Expected Result:**
  1. On click, it navigates to respective device's detailed reading and data page.
  2. Shows different sections such as: **Current readings**, **Voltage history**, **Harmonic spectrum**, **Power quality events**, **Alarm history**, **Device settings**.

### TS-DEV-06: Current readings section
* **Description:** Verify that it shows readings of different parameters for the related device.
* **Pre-conditions:** User is viewing a specific device detail page (e.g., `CAP-18`).
* **Test Steps:**
  1. Observe the readings of different parameters shown for the related device.
* **Expected Result:**
  1. Parameters such as: Voltage (A, B, C for 3 phases), Current (A, B, C), Frequency, Threshold, Power Factor, Active Power are shown with correct units ($V$, $A$, $\%$, $Hz$, $kW$).
  2. It visually flags parameters breaching nominal limits or set range values in a different color (amber).

### TS-DEV-07: Historical Graph Time-Range Switching
* **Description:** Verify that historical time-series charts update when changing duration filters.
* **Pre-conditions:** User is viewing a specific device detail page (e.g., `CAP-18`).
* **Test Steps:**
  1. Toggle between time range buttons: **Last 1h**, **Last 24h**, **Last 7d**, and **Last 30d**.
* **Expected Result:** The voltage history graph updates its x-axis scale and fetches historical aggregated time-series data corresponding to the selected window.

### TS-DEV-08: Harmonic Spectrum
* **Description:** Verify that the Harmonic spectrum chart shows the voltage / current harmonic distortion for each harmonic order.
* **Pre-conditions:** User is viewing a specific device detail page (e.g., `CAP-18`).
* **Test Steps:**
  1. Observe the **Harmonic spectrum** chart.
  2. Switch the **Harmonic measurement type** between Voltage harmonic and Current harmonic.
  3. Compare the chart values with API response `/api/devices/{id}/harmonics`.
  4. Open a device which has no harmonic data.
* **Expected Result:**
  1. Bar chart is shown per harmonic order with the x-axis label "Harmonic order" fully visible without clipping (Ref: Bug 1).
  2. Chart updates to show the selected harmonic measurement type.
  3. Chart values match with the API response.
  4. Chart section shows the message "No harmonic data available."

### TS-DEV-09: Power quality events
* **Description:** Verify that the Power quality events section lists the disturbances captured for the related device.
* **Pre-conditions:** User is viewing a specific device detail page (e.g., `CAP-18`).
* **Test Steps:**
  1. Scroll to the **Power quality events** section and observe the listed rows.
  2. Compare the rows with API response `/api/devices/{id}/pq-events`.
  3. Click on any event row.
* **Expected Result:**
  1. Each row shows event Type, Phase, Duration, Magnitude and ITIC result (`Pass` / `Fail`).
  2. Rows data matches with the API response.
  3. On click, it navigates to the respective event detail page (`/events/{id}`).

### TS-DEV-10: Alarm history
* **Description:** Verify that the Alarm history section lists all the alarms raised for the related device.
* **Pre-conditions:** User is viewing a specific device detail page (e.g., `CAP-18`).
* **Test Steps:**
  1. Scroll to the **Alarm history** section and observe the listed rows.
  2. Compare the rows with API response `/api/devices/{id}/events`.
* **Expected Result:**
  1. Each row shows Severity, Status, Measurement and Time for the alarm.
  2. Rows data matches with the API response.

### TS-DEV-11: Device settings
* **Description:** Verify that device settings (name, location and alarm thresholds) can be updated with proper field validations.
* **Pre-conditions:** User is viewing a specific device detail page (e.g., `CAP-18`).
* **Test Steps:**
  1. Scroll to the **Device settings** section and observe the fields and buttons.
  2. Clear the Device name field. Then enter only 2 characters.
  3. Clear the Location field.
  4. Enter Minimum voltage greater than or equal to Maximum voltage.
  5. Enter Minimum power factor outside 0 to 1 (e.g., `1.5`), and a non-numeric value in any threshold field.
  6. Update any threshold with a valid value and click **Reset changes**.
  7. Update any threshold with a valid value and click **Save**. Reload the page.
* **Expected Result:**
  1. Fields shown: Device name, Location, Minimum voltage, Maximum voltage, Maximum current, Maximum THD-V, Maximum THD-I, Minimum power factor, Frequency tolerance. **Save** and **Reset changes** buttons are disabled when there are no changes.
  2. Error shown: "Device name is required" and then "Device name must be at least 3 characters".
  3. Error shown: "Location is required".
  4. Error shown: "Minimum voltage must be less than maximum voltage".
  5. Range error (e.g., "Minimum power factor must be between ...") and "... must be a number" errors are shown. Save is not allowed.
  6. "Unsaved changes" text is shown on edit. On **Reset changes**, original values are restored.
  7. Toast message "Device settings saved" is shown and the updated value persists after page reload.

### TS-DEV-12: Offline device readings
* **Description:** Verify that an offline device is shown correctly in the devices list and on its detail page.
* **Pre-conditions:**
  * User has navigated to the **Devices** tab.
  * At least one device has `Offline` status.
* **Test Steps:**
  1. Select `Offline` from the **Status** filter dropdown.
  2. Observe the Status and Last reading columns.
  3. Click on the offline device row and observe the Current readings section.
* **Expected Result:**
  1. Only offline devices are listed. The count matches with *Offline devices* KPI card on Dashboard.
  2. Status shows `Offline` and Last reading shows `No data`.
  3. Device page shows "This device has not reported any readings yet. Charts and current values will appear once data arrives."

---

## 4. Events (Power quality events)

### TS-EVT-01: ITIC Tolerance Curve Plotting
* **Description:** Verify that power quality disturbances (sags, swells, interruption, RVC) plot correctly on the ITIC compliance scatter graph.
* **Pre-conditions:** User has navigated to the **Events** tab.
* **Test Steps:**
  1. Review the ITIC compliance scatter plot and underlying event table.
* **Expected Result:** Events within tolerance render as green dots inside the envelope, whereas events exceeding limits plot as red dots outside the curve.

### TS-EVT-02: Event Grid Filtering & Pagination
* **Description:** Verify multi-parameter filtering on the power quality events grid.
* **Pre-conditions:** User is on the **Events** tab.
* **Test Steps:**
  1. Apply filters for Event Type (`Sag`), Phase (`L2`), and Date Range simultaneously.
* **Expected Result:** The table narrows results accurately and recalculates total pagination counts.

### TS-EVT-03: Events - Empty state & Clear filters
* **Description:** Verify that events scatter plot and table show a proper empty state when no events match the applied filters, and filters can be cleared.
* **Pre-conditions:** User is on the **Events** tab.
* **Test Steps:**
  1. Select a date range that has no events.
  2. Click on **Clear filters** button.
* **Expected Result:**
  1. Scatter plot shows "No events to plot for the current filters." and table shows "No power quality events match your filters".
  2. All filters are reset and full events list is shown again.

### TS-EVT-04: Events list table
* **Description:** Verify that events list is shown properly in the table.
* **Pre-conditions:** User is on the **Events** tab.
* **Test Steps:**
  1. Observe the events table.
  2. Click on any row item.
  3. Observe the event detailed page.
* **Expected Result:**
  1. All power quality events data is shown in table format with columns as: Start time, Device, Type, Magnitude, Duration, Category, Phases, ITIC. First 4 columns are sortable.
  2. Clicking on any row item opens the respective item in event detailed page.
  3. Event details page shows all values such as: Type, linked Device name, ITIC result (Pass/Fail), Category, matching with the data shown on events table. RMS voltage graph is shown for the respective event on the related device.

---

## 5. Alarms & Threshold Configurations Module

### TS-ALM-01: Alarm Acknowledgement & Resolution Workflow
* **Description:** Verify that operators can acknowledge and resolve active alarm items.
* **Pre-conditions:** User has navigated to the **Alarms** tab.
* **Test Steps:**
  1. Select an active alarm row.
  2. Click the Acknowledge ($\checkmark$) button, then the Resolve action.
* **Expected Result:** The status column updates from `Active` to `Acknowledged`, then `Resolved`. The Acknowledge / Resolve buttons are disabled accordingly.

### TS-ALM-02: Device Threshold Update Validation
* **Description:** Verify that modifying threshold limits updates alarm evaluation behavior.
* **Pre-conditions:** User has access to **Device Settings**.
* **Test Steps:**
  1. Modify a threshold limit (e.g., changing minimum voltage limit from 432V to 440V) and save.
  2. Send subsequent telemetry readings below 440V.
* **Expected Result:** Incoming readings are evaluated against the newly configured 440V boundary, successfully triggering an alarm.
