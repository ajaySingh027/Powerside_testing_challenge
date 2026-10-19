# Test Report – Power Quality Monitor

---

## Summary

| Item | Details |
|---|---|
| Application | Power Quality Monitor – https://testapp.andresfloresv.com |
| Scope | Dashboard, Devices (list + detail), Events, Alarms, Onboarding modal |
| Test scenarios | 26 documented in [test_scenarios.md](test_scenarios.md) |
| Automated tests | 11 Cypress E2E tests across Dashboard, Devices, Device settings and Alarms – 10 passing, 1 failing due to Bug 2 |
| Bugs found | 7 in total: 3 High, 2 Medium, 2 Low ([bug_report.md](bug_report.md)) |

---

## 1. Features I Liked the Most

1. **Clear domain-focused design** – Events are classified (sag, swell, interruption, RVC) and plotted
   against the ITIC tolerance curve, so it's easy to see which disturbances are within tolerance.
2. **Helpful empty and error states** – Messages like "No devices match your filters", "Failed to load …" with a
   **Retry** button, and **Clear filters** shortcuts make the app easy to recover from.
3. **Good form validation in Device settings** – Inline messages (e.g. "Minimum voltage must be less than maximum
   voltage"), an "Unsaved changes" indicator and **Reset changes** prevent bad thresholds from being saved.
4. **Session security** – Automatic sign-out after inactivity, with a "Still there?" countdown before logging out.
5. **Bulk alarm acknowledgement** – Several active alarms can be acknowledged in one action.

---

## 2. What I Didn't Like & How It Could Be Improved

### 2.1 Dashboard alarm severity vs. device status
**Observation:**
In Dashboard side panel, it shows recent alarms with values as 'Critical', 'Warning' etc. But if you click that device item to analyze more, the device detail page opens and shows the device heading on top along with device status, which is different from the alarm severity value shown on Dashboard. So it's confusing to see a 'Critical' alarm on the Dashboard but an 'Online' status on the device page.

**Suggested improvement:**
When the device item is clicked, show the most recent alarm severity in the device heading.

### 2.2 Alarm severity criteria not explained
**Observation:**
In Alarms page, what's the difference between the Severity 'Critical' & 'Warning' items? How are they marked as Critical or Warning, on what parameters? Right now, as a user, I just see some rows as Critical and some as Warning with no clear difference.

**Suggested improvement:**
Add a short legend on the Alarms page explaining what makes an alarm Critical, Warning or Info.

### 2.3 Chart readability
**Observation:**
Several charts have layout issues: the clipped "Harmonic order" label, phase markers overlapping the RMS graph
x-axis, and ITIC upper/lower limits that aren't clearly marked (Bugs 1, 5 and 7).

**Suggested improvement:**
Add proper padding and legends to charts, and label the ITIC limit lines directly on the chart.

---

## 3. Features I Would Like to Have

### 3.1 Device selection for Live voltage graph
Dashboard - Live voltage graph right now shows data for only 1 device (see Bug 3). A drop-down option could be added in the graph to select the device and observe its live data.

### 3.2 Default device for Live voltage graph
In Dashboard - Live voltage graph, by default the device selected should be the one with the most recent Critical/Warning alarm detected.

### 3.3 Comments / reasoning for alarm actions
**Observation:**
In Alarms tab, if a user takes actions like 'Acknowledge' or 'Resolve', how is the action measured? What steps were taken which led to this action? Was any status or task changed?

**Suggested improvement:**
Allow the user to add a comment or reason when acknowledging / resolving an alarm.

### 3.4 Export & reporting
Export events, alarms and readings to CSV/PDF for compliance reports.

### 3.5 Alarm notifications
Email/SMS or in-app push notifications when a Critical alarm is raised.

### 3.6 Device comparison
Overlay voltage history of two or more devices on one chart to compare behaviour.
